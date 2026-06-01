# 🚀 Quick Start Guide - Image Super-Resolution with Multi-Page Frontend

## 📋 Prerequisites
- **Python 3.8+** - Download from https://www.python.org/
- **Node.js 14+** - Download from https://nodejs.org/
- **npm 8+** (comes with Node.js)

Verify installations:
```bash
python --version
node --version
npm --version
```

---

## ⚡ Quick Start (5 Minutes)

### **Terminal 1: Start Backend Flask Server**
```bash
cd backend

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start Flask server
python app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

✅ Keep this terminal running

---

### **Terminal 2: Start Frontend React Server**
```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view the app in the browser.
  Local: http://localhost:3000
```

✅ Browser should auto-open to `http://localhost:3000`

---

## 🎨 Website Navigation

Once running, navigate using the top menu bar:

- **Home** (`/`) - Project overview and features
- **Enhance** (`/enhance`) - Upload & enhance images
- **About** (`/about`) - Real-ESRGAN details & technical approach
- **Contact** (`/contact`) - Contact form & info
- **Pricing** (`/pricing`) - Free vs Academic tier comparison

---

## 🖼️ Test Image Enhancement

1. Go to **Enhance** page
2. **Drag & drop** an image (or click to browse)
3. Click **"Enhance Image"** button
4. Wait for processing (loading spinner)
5. View **before/after comparison** (slide the middle bar)
6. Click **"Download Enhanced Image"** to save result

---

## 🛑 Stop the Servers

Press `Ctrl+C` in both terminals

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot GET /" | Verify both servers running on localhost:3000 and localhost:5000 |
| Image enhancement fails | Ensure Flask backend is running; check browser console for CORS errors |
| npm install fails | Delete `node_modules` and `package-lock.json`, then run `npm install` again |
| Port 5000 in use | Kill process using port 5000 or configure different port in Flask |

---

## 📁 Project Structure

```
ai-super-resolution/
├── backend/              (Flask API - port 5000)
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
├── frontend/             (React App - port 3000)
│   ├── src/
│   │   ├── pages/       (5 pages: Home, Enhance, About, Contact, Pricing)
│   │   ├── components/  (Navbar, Footer, Particles)
│   │   ├── styles/
│   │   └── App.js       (React Router setup)
│   └── package.json
├── QUICK_START.md        (This file)
├── FRONTEND_REFACTOR.md  (Detailed frontend documentation)
└── BACKEND_UPGRADE.md    (Detailed backend documentation)
```

---

## 🔄 What's Running Where

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | React web interface |
| **Backend** | http://localhost:5000 | Flask image processing API |
| **API Endpoint** | POST /enhance | Accepts image, returns enhanced image |

---

## ✨ Features Included

✅ Multi-page routing (React Router v6)
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Setup Frontend
Open a second terminal/command prompt:
```bash
cd frontend
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # or: source venv/bin/activate
python app.py
```
✓ Backend runs on http://127.0.0.1:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✓ Frontend runs on http://localhost:3000 (opens automatically)

---

## ✅ Verify Installation

Once both services are running:

1. Check Backend Health:
   ```bash
   curl http://127.0.0.1:5000/health
   ```
   Should return: `{"status": "ok"}`

2. Open Frontend:
   Go to http://localhost:3000 in your browser

---

## 📝 Using the Application

1. **Upload Image**: Drag & drop or click to select an image
2. **Enhance**: Click the "Enhance Image" button
3. **Compare**: Use the slider to compare before/after
4. **Download**: Click "Download Enhanced Image"

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# If port is in use, kill the process or change port in app.py
```

### Frontend won't start
```bash
# Clear npm cache and reinstall
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

### Connection Error
- Ensure both services are running (Backend and Frontend terminals)
- Check browser console (F12) for detailed errors
- Verify firewall isn't blocking port 5000

### Large File Issues
- Maximum file size: 16MB
- Supported formats: PNG, JPG, GIF, BMP
- Try with a smaller image first

---

## 📚 Project Structure
```
ai-super-resolution/
├── backend/
│   ├── app.py           ← Flask API
│   └── requirements.txt  ← Python packages
└── frontend/
    ├── public/
    │   └── index.html   ← HTML entry point
    ├── src/
    │   ├── App.js       ← Main component
    │   ├── App.css      ← Component styles
    │   ├── index.css    ← Global styles
    │   └── components/
    │       └── Particles.js
    └── package.json     ← Node packages
```

---

## 🎯 Next Steps

- **Enhance the model**: Replace simple enhancement with real SRGAN
- **Add more features**: Batch processing, history, advanced options
- **Deploy**: Use Docker + Cloud (AWS, GCP, Heroku)
- **Optimize**: Add GPU support, caching, worker threads

---

## 📞 Support

If you face issues:
1. Check the README.md for detailed documentation
2. Review browser console (F12) and terminal errors
3. Verify Python and Node.js are installed correctly
4. Try reinstalling dependencies

Enjoy! 🎉
