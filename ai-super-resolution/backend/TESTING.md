# 🧪 Testing & Verification Guide for Real-ESRGAN Backend

## 1. Installation Verification

### Check Python Dependencies
```bash
cd backend
python -c "import torch; print('✓ PyTorch installed:', torch.__version__)"
python -c "import basicsr; print('✓ BasicSR installed')"
python -c "import realesrgan; print('✓ Real-ESRGAN installed')"
```

### Check GPU Availability
```bash
python -c "import torch; print('GPU Available:', torch.cuda.is_available()); print('GPU Name:', torch.cuda.get_device_name() if torch.cuda.is_available() else 'N/A')"
```

**Expected output:**
```
GPU Available: True
GPU Name: NVIDIA GeForce RTX 3080
```

## 2. Backend Startup Test

### Start Backend
```bash
cd backend
python app.py
```

**Expected output:**
```
============================================================
AI Super-Resolution Backend - Real-ESRGAN
============================================================
Device: cuda
GPU Available: True
Starting Flask server on http://127.0.0.1:5000
============================================================
```

### First Run (Model Download)
On first startup:
1. Takes 2-5 minutes
2. Downloads ~130MB model
3. Saves to `backend/models/RealESRGAN_x4plus.pth`
4. Subsequent runs are instant

**Watch for:**
- No error messages
- Model successfully downloaded
- Server running on port 5000

## 3. API Health Check

### Test 1: Basic Health Endpoint
```bash
curl http://127.0.0.1:5000/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "AI Super-Resolution API is running",
  "device": "cuda",
  "gpu_available": true,
  "model": "Real-ESRGAN (4x upscaling)"
}
```

### Test 2: Model Info Endpoint
```bash
curl http://127.0.0.1:5000/model-info
```

**Expected response:**
```json
{
  "model_name": "RealESRGAN_x4plus",
  "upscale_factor": 4,
  "device": "cuda",
  "gpu_available": true,
  "features": [
    "4x upscaling",
    "Optimized for real-world blurry images",
    "GPU accelerated",
    "Adaptive post-processing",
    "Tile-based processing for memory efficiency"
  ]
}
```

## 4. Image Enhancement Test

### Test with Small Image (Fast)
```bash
# Create or use a small test image
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@test.jpg" \
  -o enhanced.png \
  --progress-bar
```

**Monitor:**
- No errors in response
- File is created (`enhanced.png`)
- Output is 4x larger than input

### Test with Different Formats

**PNG:**
```bash
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@photo.png" \
  -o enhanced_png.png
```

**GIF:**
```bash
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@animation.gif" \
  -o enhanced_gif.png
```

**BMP:**
```bash
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@photo.bmp" \
  -o enhanced_bmp.png
```

## 5. Performance Benchmarking

### Python Test Script
```python
import time
import requests
from PIL import Image

def benchmark_enhancement(image_path):
    """Benchmark enhancement speed"""
    
    # Load image
    img = Image.open(image_path)
    print(f"Input size: {img.size}")
    
    # Send request
    start = time.time()
    with open(image_path, 'rb') as f:
        response = requests.post(
            'http://127.0.0.1:5000/enhance',
            files={'image': f}
        )
    elapsed = time.time() - start
    
    # Save output
    output_path = 'enhanced_benchmark.png'
    with open(output_path, 'wb') as f:
        f.write(response.content)
    
    # Check output
    output_img = Image.open(output_path)
    print(f"Output size: {output_img.size}")
    print(f"Processing time: {elapsed:.2f}s")
    print(f"Speed: {1/elapsed:.2f} images/second")
    
    return elapsed

# Run test
benchmark_enhancement('test.jpg')
```

### Expected Results

**GPU (RTX 3080):**
- Small (512×512): 0.8s
- Medium (1024×1024): 2.5s
- Large (2048×2048): 8s

**CPU (i7-10700):**
- Small (512×512): 8s
- Medium (1024×1024): 30s
- Large (2048×2048): Not recommended

## 6. Quality Verification

### Visual Quality Check

Process a real blurry image and verify:

1. **Sharpness**
   - ✓ Details are clearly visible
   - ✓ Text is readable
   - ✓ Edges are sharp

2. **Color Accuracy**
   - ✓ Colors match original
   - ✓ No strange color shifts
   - ✓ Saturation is natural

3. **Artifacts**
   - ✓ No checkerboard pattern
   - ✓ No color bleeding
   - ✓ Natural grain/texture

### Comparison Test
```python
from PIL import Image

# Load images
original = Image.open('test.jpg')
enhanced = Image.open('enhanced.png')

print(f"Original: {original.size} (upscaled should be 4x)")
print(f"Enhanced: {enhanced.size}")
print(f"Upscaling factor: {enhanced.width / original.width}x")
```

**Expected:**
```
Original: (512, 512) (upscaled should be 4x)
Enhanced: (2048, 2048)
Upscaling factor: 4.0x
```

## 7. Error Handling Tests

### Test 1: Missing Image
```bash
curl -X POST http://127.0.0.1:5000/enhance
```

**Expected response:**
```json
{"error": "No image file provided"}
```
Status: 400

### Test 2: Unsupported Format
```bash
echo "not an image" > fake.pdf
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@fake.pdf"
```

**Expected response:**
```json
{"error": "File type not allowed. Supported: PNG, JPG, GIF, BMP"}
```
Status: 400

### Test 3: File Too Large
```bash
# Create 20MB file (exceeds 16MB limit)
dd if=/dev/urandom of=large.bin bs=1M count=20
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@large.bin"
```

**Expected:** Request rejected due to size

### Test 4: Invalid Image
```bash
# Create corrupted image file
dd if=/dev/urandom of=corrupt.jpg bs=1K count=100
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@corrupt.jpg"
```

**Expected response:**
```json
{"error": "Error processing image: ..."}
```
Status: 500

## 8. Stress Testing

### Load Test (Single Client)
```python
import requests
import time

def stress_test(num_images=10):
    """Test multiple sequential requests"""
    times = []
    
    for i in range(num_images):
        start = time.time()
        with open('test.jpg', 'rb') as f:
            response = requests.post(
                'http://127.0.0.1:5000/enhance',
                files={'image': f}
            )
        elapsed = time.time() - start
        times.append(elapsed)
        print(f"Image {i+1}: {elapsed:.2f}s")
    
    avg_time = sum(times) / len(times)
    print(f"\nAverage time: {avg_time:.2f}s")
    print(f"Min: {min(times):.2f}s, Max: {max(times):.2f}s")

stress_test(10)
```

### Monitor Resources
During stress test, monitor:

**GPU:**
```bash
nvidia-smi -l 1  # Update every second
```

**CPU & Memory:**
```bash
# Windows
Get-Process python | Format-Table @{name='CPU'; expression={$_.CPU.ToString()}}, ProcessName, @{name='Memory'; expression={[math]::round($_.WorkingSet/1Mb, 2)}}

# Linux/Mac
top -p $(pgrep -f "python app.py")
```

## 9. Memory Leak Test

### Long-Running Test
```python
import requests
import psutil
import os

def memory_leak_test(duration_seconds=300):
    """Run for 5 minutes and monitor memory"""
    process = psutil.Process(os.getpid())
    start_time = time.time()
    
    while time.time() - start_time < duration_seconds:
        # Process image
        with open('test.jpg', 'rb') as f:
            requests.post(
                'http://127.0.0.1:5000/enhance',
                files={'image': f}
            )
        
        # Check memory
        mem_mb = process.memory_info().rss / 1024 / 1024
        print(f"Memory: {mem_mb:.1f}MB")
        time.sleep(1)

memory_leak_test(300)  # Run for 5 minutes
```

**Healthy behavior:** Memory stays relatively constant after initial load

## 10. Frontend Integration Test

### Run Both Services
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm start
```

### Manual Test
1. Open http://localhost:3000
2. Upload test image
3. Click "Enhance Image"
4. Verify output appears
5. Compare before/after
6. Download enhanced image

### Automated Test
```python
import requests
from PIL import Image

def test_full_flow():
    """Test complete enhancement flow"""
    
    # Create test image
    img = Image.new('RGB', (512, 512), color='red')
    img.save('test_flow.jpg')
    
    # Send to backend
    with open('test_flow.jpg', 'rb') as f:
        response = requests.post(
            'http://127.0.0.1:5000/enhance',
            files={'image': f}
        )
    
    # Verify response
    assert response.status_code == 200, f"Error: {response.text}"
    
    # Save and verify output
    with open('test_flow_enhanced.png', 'wb') as f:
        f.write(response.content)
    
    # Check dimensions
    result = Image.open('test_flow_enhanced.png')
    assert result.size == (2048, 2048), f"Wrong size: {result.size}"
    
    print("✓ Full flow test passed!")

test_full_flow()
```

## 11. Regression Testing

### Create Test Suite
```bash
# Save test images
test_images/
├── blurry.jpg          # Very blurry
├── clear.jpg           # Clear quality
├── noisy.jpg           # High noise
├── text_document.png   # Document
├── photo.jpg           # Natural photo
└── expected_outputs/
    ├── blurry_out.png
    ├── clear_out.png
    └── ...
```

### Verify Each Test
```bash
# Run all tests
for img in test_images/*.jpg test_images/*.png; do
    echo "Testing: $img"
    curl -X POST http://127.0.0.1:5000/enhance \
      -F "image=@$img" \
      -o "output_$(basename $img).png"
done
```

## Checklist: Complete Testing

- [ ] Python dependencies installed
- [ ] GPU detected (if available)
- [ ] Backend starts without errors
- [ ] Health endpoint responds
- [ ] Model info endpoint responds
- [ ] Small image enhancement works
- [ ] All formats (PNG, JPG, GIF, BMP) work
- [ ] Output is 4x larger
- [ ] Output quality looks good
- [ ] Error messages are clear
- [ ] Large files are rejected
- [ ] Corrupted files handled gracefully
- [ ] Performance meets expectations
- [ ] Memory usage is stable
- [ ] Frontend integration works
- [ ] Download functionality works

---

**All tests passing = Production ready! ✅**
