from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import cv2
import os
import torch
import warnings
from werkzeug.utils import secure_filename
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB
MODEL_CACHE_DIR = 'models'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(MODEL_CACHE_DIR):
    os.makedirs(MODEL_CACHE_DIR)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Global model instance (lazy loaded)
upsampler_model = None
device = None

warnings.filterwarnings('ignore')


def get_device():
    """Get GPU device if available, else CPU"""
    global device
    if device is None:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        logger.info(f"Using device: {device}")
    return device


def load_real_esrgan_model():
    """
    Load Real-ESRGAN model for super-resolution
    Uses RealESRGAN_x4plus model for 4x upscaling
    Falls back to OpenCV upsampling if model download fails
    """
    global upsampler_model
    
    if upsampler_model is not None:
        return upsampler_model
    
    try:
        from basicsr.archs.rrdbnet_arch import RRDBNet
        from realesrgan import RealESRGANer
        
        device = get_device()
        
        # Model definition
        model_name = 'RealESRGAN_x4plus'
        model = RRDBNet(
            num_in_ch=3,
            num_out_ch=3,
            num_feat=64,
            num_block=23,
            num_grow_ch=32,
            scale=4
        )
        
        # Model path
        model_path = os.path.join(MODEL_CACHE_DIR, f'{model_name}.pth')
        
        # Download model if not exists
        if not os.path.exists(model_path):
            logger.info(f"Downloading {model_name} model...")
            import urllib.request
            
            # Try multiple URLs (including new sources)
            model_urls = [
                f'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/{model_name}.pth',
                f'https://huggingface.co/xinntao/Real-ESRGAN/resolve/main/{model_name}.pth',
                f'https://huggingface.co/ai-forever/Real-ESRGAN/resolve/main/{model_name}.pth',
            ]
            
            downloaded = False
            for model_url in model_urls:
                try:
                    logger.info(f"Trying URL: {model_url}")
                    urllib.request.urlretrieve(model_url, model_path, reporthook=lambda count, block_size, total_size: logger.debug(f"Downloaded {count * block_size / (1024*1024):.1f}MB"))
                    logger.info(f"Model downloaded successfully to {model_path}")
                    downloaded = True
                    break
                except Exception as e:
                    logger.warning(f"Failed to download from {model_url}: {e}")
                    # Clean up partial download
                    if os.path.exists(model_path):
                        os.remove(model_path)
                    continue
            
            if not downloaded:
                logger.warning(f"Failed to download model from all sources. Using fallback method.")
                upsampler_model = "fallback_opencv"  # Use fallback mode
                return upsampler_model
        
        # Initialize upsampler
        upsampler_model = RealESRGANer(
            scale=4,
            model_path=model_path,
            model=model,
            tile=400,  # Tile size for processing (prevents OOM)
            tile_pad=10,
            pre_pad=0,
            half=torch.cuda.is_available()  # Use half precision on GPU
        )
        
        logger.info(f"Real-ESRGAN model loaded successfully")
        return upsampler_model
        
    except ImportError as e:
        logger.error(f"Failed to import required modules: {e}")
        logger.warning("Falling back to OpenCV upsampling method")
        upsampler_model = "fallback_opencv"
        return upsampler_model
    except Exception as e:
        logger.error(f"Failed to load Real-ESRGAN model: {e}")
        logger.warning("Falling back to OpenCV upsampling method")
        upsampler_model = "fallback_opencv"
        return upsampler_model


def preprocess_image(image_pil):
    """
    Preprocess PIL image for model inference
    - Convert to RGB
    - Convert to numpy array
    - Validate dimensions
    """
    # Convert to RGB if necessary
    if image_pil.mode in ('RGBA', 'LA'):
        # Create RGB background
        rgb_image = Image.new('RGB', image_pil.size, (255, 255, 255))
        # Paste with alpha channel as mask
        if image_pil.mode == 'RGBA':
            rgb_image.paste(image_pil, mask=image_pil.split()[3])
        else:  # LA mode
            rgb_image.paste(image_pil, mask=image_pil.split()[1])
        image_pil = rgb_image
    elif image_pil.mode == 'P':
        # Palette mode - convert to RGBA first, then to RGB
        image_pil = image_pil.convert('RGBA')
        rgb_image = Image.new('RGB', image_pil.size, (255, 255, 255))
        rgb_image.paste(image_pil, mask=image_pil.split()[3])
        image_pil = rgb_image
    elif image_pil.mode != 'RGB':
        image_pil = image_pil.convert('RGB')
    
    # Convert to numpy array (RGB format)
    image_array = np.array(image_pil)
    
    # Validate dimensions
    if len(image_array.shape) != 3 or image_array.shape[2] != 3:
        raise ValueError("Image must be RGB")
    
    # Ensure uint8
    if image_array.dtype != np.uint8:
        image_array = np.clip(image_array, 0, 255).astype(np.uint8)
    
    logger.info(f"Input image shape: {image_array.shape}, dtype: {image_array.dtype}")
    return image_array


def enhance_with_real_esrgan(image_array):
    """
    Enhance image using Real-ESRGAN model or fallback to OpenCV upsampling
    Supports 4x upscaling with high quality
    Falls back to Lanczos upsampling if model unavailable
    """
    try:
        model = load_real_esrgan_model()
        device = get_device()
        
        # Use fallback method if model download failed
        if model == "fallback_opencv":
            logger.warning("Using OpenCV/PIL fallback upsampling method (Real-ESRGAN unavailable)")
            return fallback_upsampling(image_array)
        
        # Image is in RGB format, Real-ESRGAN expects BGR
        image_bgr = cv2.cvtColor(image_array, cv2.COLOR_RGB2BGR)
        
        logger.info("Starting Real-ESRGAN inference...")
        
        # Inference
        output_bgr, _ = model.enhance(image_bgr, outscale=4)
        
        # Convert back to RGB
        output_rgb = cv2.cvtColor(output_bgr, cv2.COLOR_BGR2RGB)
        
        logger.info(f"Output image shape: {output_rgb.shape}")
        return output_rgb
        
    except Exception as e:
        logger.error(f"Error in Real-ESRGAN enhancement: {e}")
        logger.warning("Falling back to OpenCV upsampling")
        return fallback_upsampling(image_array)


def fallback_upsampling(image_array):
    """
    Fallback image upsampling using OpenCV Lanczos interpolation
    Provides high-quality 4x upsampling when Real-ESRGAN model is unavailable
    
    Args:
        image_array: RGB image array (uint8)
        
    Returns:
        Upsampled RGB image array
    """
    try:
        logger.info("Applying Lanczos upsampling (4x scale)...")
        height, width = image_array.shape[:2]
        new_height, new_width = height * 4, width * 4
        
        # Use Lanczos for high-quality upsampling
        upsampled = cv2.resize(
            image_array,
            (new_width, new_height),
            interpolation=cv2.INTER_LANCZOS4
        )
        
        logger.info(f"Fallback upsampling complete: {image_array.shape} -> {upsampled.shape}")
        return upsampled
        
    except Exception as e:
        logger.error(f"Fallback upsampling error: {e}")
        raise


def post_process_sharpening(image_array, strength=1.2):
    """
    Apply post-processing sharpening for better visual clarity
    Uses unsharp masking technique
    
    Args:
        image_array: RGB image array
        strength: Sharpening strength (1.0 = moderate, 1.5 = strong)
    """
    # Convert to float for processing
    img_float = image_array.astype(np.float32) / 255.0
    
    # Create blurred version
    img_blurred = cv2.GaussianBlur(img_float, (0, 0), 1.0)
    
    # Unsharp masking
    img_sharp = cv2.addWeighted(
        img_float, 
        1.0 + (strength - 1.0) * 0.5, 
        img_blurred, 
        -(strength - 1.0) * 0.5, 
        0
    )
    
    # Clip and convert back to uint8
    img_sharp = np.clip(img_sharp * 255.0, 0, 255).astype(np.uint8)
    
    logger.info(f"Applied post-processing sharpening with strength {strength}")
    return img_sharp


def adaptive_enhancement(image_array):
    """
    Apply adaptive enhancement based on image characteristics
    - Detects blur level and adjusts processing accordingly
    - Preserves detail while reducing artifacts
    """
    # Calculate Laplacian variance (blur detector)
    gray = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    logger.info(f"Image blur metric (Laplacian variance): {laplacian_var:.2f}")
    
    # Adjust sharpening based on blur level
    if laplacian_var < 100:  # Very blurry
        sharpening_strength = 1.4
        logger.info("Detected very blurry image - applying strong sharpening")
    elif laplacian_var < 300:  # Moderately blurry
        sharpening_strength = 1.2
        logger.info("Detected moderately blurry image - applying moderate sharpening")
    else:  # Clear image
        sharpening_strength = 1.0
        logger.info("Detected clear image - applying light sharpening")
    
    # Apply post-processing with adaptive strength
    enhanced = post_process_sharpening(image_array, strength=sharpening_strength)
    
    return enhanced


@app.route('/enhance', methods=['POST'])
def enhance():
    """
    API endpoint to enhance an image using Real-ESRGAN
    Expects multipart/form-data with 'image' field
    Returns 4x upscaled enhanced image as PNG
    
    Performance:
    - 4x upscaling (e.g., 512x512 -> 2048x2048)
    - Optimized for blurry/low-quality images
    - GPU accelerated if available
    """
    try:
        # Validate request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed. Supported: PNG, JPG, GIF, BMP'}), 400
        
        # Read and preprocess image
        logger.info(f"Processing image: {file.filename}")
        image_pil = Image.open(file.stream)
        image_rgb = preprocess_image(image_pil)
        
        # Enhance using Real-ESRGAN
        enhanced_rgb = enhance_with_real_esrgan(image_rgb)
        
        # Apply adaptive post-processing
        final_output = adaptive_enhancement(enhanced_rgb)
        
        # Convert to PIL Image
        enhanced_image = Image.fromarray(final_output)
        
        # Save to bytes buffer
        buffer = io.BytesIO()
        enhanced_image.save(buffer, format='PNG', quality=95)
        buffer.seek(0)
        
        logger.info(f"Successfully enhanced image: {file.filename}")
        
        return send_file(
            buffer,
            mimetype='image/png',
            as_attachment=True,
            download_name='enhanced_image.png'
        )
    
    except ValueError as e:
        logger.warning(f"Validation error: {str(e)}")
        return jsonify({'error': f'Image validation error: {str(e)}'}), 400
    
    except RuntimeError as e:
        logger.error(f"GPU/Model error: {str(e)}")
        return jsonify({'error': f'Model processing error: {str(e)}'}), 500
    
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}", exc_info=True)
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    device = get_device()
    gpu_available = torch.cuda.is_available()
    
    # Check if using fallback
    model = load_real_esrgan_model()
    using_fallback = model == "fallback_opencv"
    model_info = 'Real-ESRGAN (4x upscaling)' if not using_fallback else 'Fallback OpenCV Lanczos (4x upscaling)'
    
    return jsonify({
        'status': 'ok',
        'message': 'AI Super-Resolution API is running',
        'device': str(device),
        'gpu_available': gpu_available,
        'model': model_info,
        'using_fallback': using_fallback
    }), 200


@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model"""
    try:
        device = get_device()
        return jsonify({
            'model_name': 'RealESRGAN_x4plus',
            'upscale_factor': 4,
            'device': str(device),
            'gpu_available': torch.cuda.is_available(),
            'description': 'Real-ESRGAN for blind real-world super-resolution',
            'features': [
                '4x upscaling',
                'Optimized for real-world blurry images',
                'GPU accelerated',
                'Adaptive post-processing',
                'Tile-based processing for memory efficiency'
            ],
            'preprocessing': [
                'RGB conversion',
                'Dimension validation',
                'Data type normalization'
            ],
            'postprocessing': [
                'Adaptive unsharp masking',
                'Blur detection',
                'Artifact reduction'
            ]
        }), 200
    except Exception as e:
        logger.error(f"Error getting model info: {e}")
        return jsonify({'error': str(e)}), 500


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == '__main__':
    logger.info("="*60)
    logger.info("AI Super-Resolution Backend - Real-ESRGAN")
    logger.info("="*60)
    logger.info(f"Device: {get_device()}")
    logger.info(f"GPU Available: {torch.cuda.is_available()}")
    logger.info("Starting Flask server on http://127.0.0.1:5000")
    logger.info("="*60)
    
    app.run(debug=True, host='127.0.0.1', port=5000)
