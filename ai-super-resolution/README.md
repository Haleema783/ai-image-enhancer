# AI Image Super-Resolution Web Application

A full-stack AI image enhancement application with a modern glassmorphic UI.

## 🚀 Features

- **AI Image Enhancement**: Uses deep learning concepts to enhance image quality
- **Modern UI**: Glassmorphism design with smooth animations
- **Drag & Drop Upload**: Easy image upload with visual feedback
- **Before/After Comparison**: Interactive slider to compare original and enhanced images
- **Download Functionality**: Save enhanced images to your device
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Particle Background**: Animated particle effects for visual appeal

## 📁 Project Structure

```
ai-super-resolution/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt        # Python dependencies
│   └── model/
│       └── sr_model.h5        # Placeholder for model (optional)
└── frontend/
    ├── public/
    │   └── index.html         # HTML entry point
    ├── src/
    │   ├── App.js             # Main App component
    │   ├── App.css            # App styling
    │   ├── index.js           # React entry point
    │   ├── index.css          # Global styles
    │   └── components/
    │       └── Particles.js   # Particle background component
    └── package.json           # Node dependencies
```

## ⚙️ Setup & Installation

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 How to Use

1. **Upload Image**: Drag and drop an image or click to browse
2. **Enhance**: Click the "Enhance Image" button
3. **Compare**: Use the slider to compare original and enhanced versions
4. **Download**: Click "Download Enhanced Image" to save

## 🛠️ Technology Stack

### Backend
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **OpenCV**: Image processing
- **Pillow**: Image manipulation
- **NumPy**: Numerical computations

### Frontend
- **React 18**: UI library
- **Axios**: HTTP client
- **React-Dropzone**: File upload handling
- **Framer Motion**: Animations
- **React-Compare-Image**: Before/After slider
- **React-TSParticles**: Particle effects
- **React-Spinners**: Loading indicators
- **File-Saver**: Download functionality

## 🎨 Design Features

- **Glassmorphism**: Modern UI with frosted glass effect
- **Dark Theme**: Easy on the eyes with vibrant gradients
- **Smooth Animations**: Framer Motion for fluid interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions

## 📝 API Endpoints

### POST `/enhance`
Enhances an uploaded image.

**Request:**
- Content-Type: multipart/form-data
- Field: `image` (binary file)

**Response:**
- Content-Type: image/png
- Returns: Enhanced image as PNG blob

**Example:**
```javascript
const formData = new FormData();
formData.append('image', imageFile);

const response = await axios.post(
  'http://127.0.0.1:5000/enhance',
  formData,
  { responseType: 'blob' }
);
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Super-Resolution API is running"
}
```

## 🔧 Enhancement Algorithm

The backend uses a combination of image processing techniques:

1. **Bilateral Filtering**: Noise reduction while preserving edges
2. **CLAHE**: Contrast Limited Adaptive Histogram Equalization
3. **Unsharp Masking**: Image sharpening
4. **Brightness Adjustment**: Optimal visibility

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🚨 Troubleshooting

### Backend Connection Error
- Ensure Flask server is running on `http://127.0.0.1:5000`
- Check if port 5000 is not blocked by firewall
- Verify CORS is enabled in `app.py`

### Large File Upload Issues
- Maximum file size: 16MB
- Supported formats: PNG, JPG, GIF, BMP
- Check browser console for detailed error messages

### React Dependency Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 🎓 Learning Resources

- Flask Documentation: https://flask.palletsprojects.com/
- React Documentation: https://react.dev/
- OpenCV Documentation: https://docs.opencv.org/
- Framer Motion: https://www.framer.com/motion/

## 📄 License

This project is open-source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## ✨ Future Enhancements

- Real SRGAN model integration
- Batch image processing
- User accounts and history
- Advanced enhancement options
- GPU acceleration support
- Real-time preview
- Multiple enhancement algorithms

---

**Enjoy enhancing your images with AI!** 🎉
