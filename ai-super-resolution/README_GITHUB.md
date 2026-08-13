# 🎨 AI Image Super-Resolution Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/downloads/)
[![Node.js 14+](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Flask 2.3](https://img.shields.io/badge/Flask-2.3-black.svg)](https://flask.palletsprojects.com/)

A full-stack AI-powered image enhancement application that uses advanced deep learning techniques (Real-ESRGAN) to upscale and enhance image quality. Features a modern glassmorphic UI with drag-and-drop functionality, before/after comparison, and responsive design.

## ✨ Key Highlights

- 🚀 **AI-Powered Enhancement**: Uses Real-ESRGAN model for state-of-the-art image super-resolution
- 🎨 **Modern UI**: Glassmorphism design with smooth animations and particle effects
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🖼️ **Before/After Comparison**: Interactive slider to compare original and enhanced images
- 💾 **Easy Download**: Save enhanced images in PNG format with a single click
- ⚡ **Multi-Page Application**: Home, Enhance, About, Contact, and Pricing pages
- 🔒 **Secure**: File validation, CORS protection, and error handling

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Features

### Backend Features
- ✅ Flask REST API with CORS enabled
- ✅ Real-ESRGAN deep learning model integration
- ✅ Advanced image enhancement algorithm:
  - Bilateral filtering for noise reduction
  - CLAHE for contrast enhancement
  - Unsharp masking for sharpening
  - Brightness optimization
- ✅ Multiple image format support (PNG, JPG, GIF, BMP)
- ✅ File size validation (max 16MB)
- ✅ Health check endpoint for monitoring
- ✅ Error handling and validation
- ✅ GPU acceleration support (CUDA)
- ✅ Comprehensive logging

### Frontend Features
- ✅ React 18 with functional components
- ✅ Image drag & drop upload
- ✅ Click to browse file upload
- ✅ Image preview before enhancement
- ✅ Loading spinner animation
- ✅ Before/After comparison slider
- ✅ Download enhanced image functionality
- ✅ Error messages with helpful feedback
- ✅ Responsive design (mobile-first approach)
- ✅ Smooth animations and transitions
- ✅ Multi-page navigation

### UI/UX Features
- ✅ Glassmorphism design pattern
- ✅ Dark theme with slate/black background
- ✅ Gradient text effects
- ✅ Particle animated background
- ✅ Hover effects and smooth transitions
- ✅ Loading states and empty states
- ✅ Keyboard accessible
- ✅ Touch-friendly mobile UI

## 📁 Project Structure

```
ai-super-resolution/
├── backend/
│   ├── app.py                      # Flask API server
│   ├── requirements.txt            # Python dependencies
│   ├── config.ini                  # Configuration file
│   ├── Procfile                    # Deployment configuration
│   ├── ADVANCED_CONFIG.md          # Advanced configuration guide
│   ├── BACKEND_UPGRADE.md          # Backend upgrade documentation
│   ├── TESTING.md                  # Testing guide
│   ├── test_api.py                 # API test file
│   ├── models/                     # Model cache directory
│   ├── uploads/                    # Image uploads directory
│   └── model/                      # Model files directory
│
├── frontend/
│   ├── public/
│   │   └── index.html              # HTML entry point
│   ├── src/
│   │   ├── App.js                  # Main App component
│   │   ├── App.css                 # App styling
│   │   ├── index.js                # React entry point
│   │   ├── index.css               # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.js           # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js           # Footer component
│   │   │   ├── Footer.css
│   │   │   └── Particles.js        # Particle background
│   │   └── pages/
│   │       ├── Home.js             # Home page
│   │       ├── Enhance.js          # Image enhancement page
│   │       ├── About.js            # About/Technical details
│   │       ├── Contact.js          # Contact page
│   │       ├── Pricing.js          # Pricing information
│   │       └── styles/             # Page-specific styles
│   ├── package.json                # Node.js dependencies
│   ├── build/                      # Production build
│   └── .env.example                # Environment variables template
│
├── README.md                       # Main documentation
├── FEATURES.md                     # Detailed features list
├── QUICK_START.md                  # Quick start guide
├── INSTALLATION.md                 # Installation guide
├── setup.bat                       # Windows setup script
├── setup.sh                        # Linux/Mac setup script
├── start.bat                       # Windows start script
├── start.sh                        # Linux/Mac start script
└── render.yaml                     # Render.com deployment config
```

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.8+ | Runtime environment |
| **Flask** | 2.3.3 | Web framework |
| **Flask-CORS** | 4.0.0 | Cross-origin resource sharing |
| **PyTorch** | 2.0.1 | Deep learning framework |
| **Real-ESRGAN** | 0.3.0 | Super-resolution model |
| **BasicSR** | 1.4.2 | Image super-resolution toolkit |
| **OpenCV** | 4.8.0.76 | Computer vision library |
| **Pillow** | 10.0.0 | Image processing |
| **NumPy** | 1.24.3 | Numerical computing |
| **SciPy** | 1.11.0 | Scientific computing |
| **scikit-image** | 0.21.0 | Image processing algorithms |
| **Gunicorn** | 21.2.0 | Production server |
| **python-dotenv** | 1.0.0 | Environment variable management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2.0 | UI library |
| **React Router DOM** | 6.22.3 | Client-side routing |
| **Axios** | 1.5.0 | HTTP client |
| **react-dropzone** | 14.2.3 | Drag-and-drop file upload |
| **react-compare-image** | Latest | Before/after comparison slider |
| **react-spinners** | 0.13.8 | Loading spinners |
| **framer-motion** | 10.16.4 | Animation library |
| **tsparticles** | 2.12.0 | Particle effects |
| **file-saver** | 2.0.5 | File download utility |

## 💻 System Requirements

### Minimum Requirements
| Component | Requirement |
|---|---|
| **Python** | 3.8 or higher |
| **Node.js** | 14.0 or higher |
| **npm** | 6.0 or higher |
| **RAM** | 4GB minimum (8GB+ recommended) |
| **Storage** | 2GB free space |
| **OS** | Windows, macOS, or Linux |

### Optional
- **CUDA** (11.8+): For GPU acceleration (recommended)
- **Git**: For version control

### Verify Installation
```bash
python --version
node --version
npm --version
```

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Haleema783/ai-image-super-resolution.git
cd ai-super-resolution
```

### 2️⃣ Setup Backend (Terminal 1)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

✅ Backend runs at `http://127.0.0.1:5000`

### 3️⃣ Setup Frontend (Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend opens at `http://localhost:3000`

### 4️⃣ Test the Application
1. Open http://localhost:3000 in your browser
2. Navigate to the **Enhance** page
3. Upload an image (drag & drop or click)
4. Click **"Enhance Image"**
5. Compare results with the slider
6. Download the enhanced image

## 📦 Installation

### Automatic Setup (Recommended for Windows)
```bash
cd ai-super-resolution
setup.bat
```

This script will:
- Create Python virtual environment
- Install all Python dependencies
- Install all Node.js dependencies
- Display next steps

### Manual Installation

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Frontend Setup
```bash
cd frontend
npm install
```

## 🎨 Usage Guide

### Basic Workflow

#### Step 1: Upload Image
- **Method 1**: Drag and drop an image onto the upload area
- **Method 2**: Click to open file browser and select an image

**Supported Formats:**
- PNG (`.png`) - RGB colored images
- JPEG (`.jpg`, `.jpeg`) - RGB colored images
- GIF (`.gif`) - RGB colored images
- BMP (`.bmp`) - RGB colored images

**Image Requirements:**
- **Color Mode**: RGB colored images (3-channel images)
- **Maximum file size**: 16MB
- **Recommended**: High-quality source images for best results
- **Note**: Grayscale and RGBA images will be automatically converted to RGB format

#### Step 2: Enhance Image
1. After selecting an image, click the **"Enhance Image"** button
2. Wait for the processing to complete (loading spinner shown)
3. Processing time depends on image size and system performance

#### Step 3: Compare Results
- Use the middle slider on the comparison panel
- Drag left to see original image
- Drag right to see enhanced image
- Observe the improvements in detail, sharpness, and clarity

#### Step 4: Download Enhanced Image
- Click **"Download Enhanced Image"** button
- Image saves as PNG file
- Try another image by clicking **"Try Another Image"**

### Navigation
| Page | URL | Purpose |
|---|---|---|
| **Home** | `/` | Project overview and features |
| **Enhance** | `/enhance` | Upload and enhance images |
| **About** | `/about` | Technical details and AI model info |
| **Contact** | `/contact` | Contact form and information |
| **Pricing** | `/pricing` | Free vs Premium tier details |

## 🔌 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 2. Enhance Image
```http
POST /enhance
Content-Type: multipart/form-data
```

**Request:**
```
image: <binary file>
```

**Supported Formats:**
- PNG, JPG, JPEG, GIF, BMP (all as RGB colored images)

**Image Requirements:**
- **Color Mode**: RGB colored images (3-channel)
- **Max File Size**: 16MB
- **Note**: Grayscale and RGBA images are automatically converted to RGB

**Success Response (200):**
```
Binary PNG image data
Content-Type: image/png
```

**Error Response (400):**
```json
{
  "error": "No image provided or invalid format"
}
```

**Error Response (413):**
```json
{
  "error": "File size exceeds maximum limit of 16MB"
}
```

**Error Response (500):**
```json
{
  "error": "Processing error message"
}
```

### Example Usage

#### Using cURL
```bash
curl -X POST -F "image=@image.jpg" http://localhost:5000/enhance -o enhanced.png
```

#### Using Python Requests
```python
import requests

with open('image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:5000/enhance', files=files)
    
    with open('enhanced.png', 'wb') as out:
        out.write(response.content)
```

#### Using JavaScript/Axios
```javascript
const formData = new FormData();
formData.append('image', imageFile);

const response = await axios.post(
  'http://localhost:5000/enhance',
  formData,
  { responseType: 'blob' }
);

const url = window.URL.createObjectURL(response.data);
const link = document.createElement('a');
link.href = url;
link.download = 'enhanced.png';
link.click();
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend/` folder:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=1
FLASK_APP=app.py

# Server Configuration
BACKEND_PORT=5000
BACKEND_HOST=127.0.0.1

# Model Configuration
MODEL_CACHE_DIR=models
MAX_FILE_SIZE=16777216  # 16MB in bytes

# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### Frontend Configuration

Create a `.env` file in the `frontend/` folder:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=120000

# App Configuration
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=AI Image Super-Resolution
```

### Advanced Configuration

See [ADVANCED_CONFIG.md](./backend/ADVANCED_CONFIG.md) for:
- GPU optimization settings
- Model selection and parameters
- Performance tuning
- Memory management
- Batch processing configuration

## 🚀 Deployment

### Production Deployment

#### Option 1: Render.com (Recommended)
See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for step-by-step deployment guide.

#### Option 2: Heroku
```bash
# Install Heroku CLI
heroku login

# Create Heroku app
heroku create your-app-name

# Set Python buildpack
heroku buildpacks:set heroku/python

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Option 3: Docker
```dockerfile
# Build Docker image
docker build -t ai-super-resolution .

# Run container
docker run -p 5000:5000 -p 3000:3000 ai-super-resolution
```

### Environment-Specific Builds

#### Frontend Production Build
```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/build/`.

#### Backend Production Server
```bash
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🐛 Troubleshooting

### Common Issues

#### Python/Virtual Environment Issues
| Issue | Solution |
|-------|----------|
| `python: command not found` | Install Python from https://www.python.org/ |
| `ModuleNotFoundError: No module named 'flask'` | Run `pip install -r requirements.txt` |
| `venv is not recognized` | Use full path: `.\venv\Scripts\activate` on Windows |

#### Node.js/npm Issues
| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js from https://nodejs.org/ |
| `Port 3000 already in use` | Kill process: `netstat -ano \| findstr :3000` (Windows) or `lsof -i :3000` (Mac/Linux) |
| `Module not found` | Delete `node_modules` and `package-lock.json`, then run `npm install` |

#### API Connection Issues
| Issue | Solution |
|-------|----------|
| Frontend can't reach backend | Ensure backend is running on port 5000 |
| CORS errors | Check CORS configuration in `backend/app.py` |
| Image processing fails | Check file size (max 16MB) and supported format |

#### Performance Issues
| Issue | Solution |
|-------|----------|
| Slow processing | GPU acceleration recommended; check CUDA installation |
| High memory usage | Reduce batch size or process smaller images |
| Out of memory error | Increase system RAM or close other applications |

### Getting Help

1. Check [TESTING.md](./backend/TESTING.md) for testing procedures
2. Review [ADVANCED_CONFIG.md](./backend/ADVANCED_CONFIG.md) for configuration options
3. Check backend logs: `tail -f backend.log`
4. Enable debug mode in Flask: `FLASK_DEBUG=1`

## 🧪 Testing

### Backend Testing
```bash
cd backend
python test_api.py
```

### Frontend Testing
```bash
cd frontend
npm test
```

See [TESTING.md](./backend/TESTING.md) for detailed testing procedures and test cases.

## 📋 API Testing with cURL

```bash
# Health check
curl http://localhost:5000/health

# Enhance an image
curl -X POST -F "image=@test.jpg" http://localhost:5000/enhance -o enhanced.png
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Write clean, readable code
- Add comments for complex logic
- Follow PEP 8 for Python code
- Follow ESLint rules for JavaScript
- Update documentation for new features
- Test thoroughly before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Authors

- **Haleema Sadia** - Initial work

## 🙏 Acknowledgments

- **Real-ESRGAN** - Advanced image super-resolution model by Xintao Wang et al.
- **Framer Motion** - Animation library
- **React** - UI framework
- **Flask** - Web framework

## 📞 Support

For questions or issues, please open an issue on GitHub.

## 📊 Project Statistics

- **Backend Lines of Code**: ~500+
- **Frontend Lines of Code**: ~2000+
- **Total Dependencies**: 25+
- **Supported Image Formats**: 4
- **Max Processing Size**: 16MB
- **Pages**: 5

## 🗓️ Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ Real-ESRGAN integration
- ✅ Multi-page React frontend
- ✅ Glassmorphism UI design
- ✅ Before/after comparison
- ✅ Responsive design
- ✅ Production-ready deployment

### Planned Features (Future)
- 🔄 Batch processing
- 📊 Processing analytics
- 🎨 Custom filters
- 👤 User authentication
- 💾 Image history/gallery
- 📧 Email results


**⭐ If you find this project helpful, please give it a star! ⭐**


