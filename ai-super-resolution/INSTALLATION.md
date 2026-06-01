# 📋 Complete Installation & Setup Guide

## System Requirements

| Requirement | Version | Download |
|---|---|---|
| Python | 3.8+ | https://www.python.org/downloads/ |
| Node.js | 14+ | https://nodejs.org/en/download/ |
| npm | 6+ | Comes with Node.js |
| Git | Latest | https://git-scm.com/downloads |

---

## ✅ Step 1: Verify Prerequisites

### Windows:
```cmd
python --version
node --version
npm --version
```

### Mac/Linux:
```bash
python3 --version
node --version
npm --version
```

All should show version numbers (not "command not found").

---

## 🚀 Step 2: Automatic Setup (Recommended for Windows)

### Quick Setup:
```bash
cd ai-super-resolution
setup.bat
```

This automatically:
- Creates Python virtual environment
- Installs Python dependencies
- Installs Node.js dependencies
- Outputs next steps

---

## 🔧 Step 3: Manual Setup (All Platforms)

### A. Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Create Python virtual environment:
```bash
# Windows
python -m venv venv

# Mac/Linux
python3 -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

Expected output: `(venv)` appears in terminal

4. Install dependencies:
```bash
pip install -r requirements.txt
```

This installs:
- Flask 2.3.3
- Flask-CORS 4.0.0
- Pillow 10.0.0
- NumPy 1.24.3
- OpenCV 4.8.0.76

### B. Frontend Setup

1. Open new terminal and navigate:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

This installs React and all required libraries.

---

## ▶️ Step 4: Run the Application

### Start Backend (Terminal 1):
```bash
cd backend
venv\Scripts\activate  # Windows: or source venv/bin/activate
python app.py
```

**Expected output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### Start Frontend (Terminal 2):
```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view ai-super-resolution-frontend in the browser.
Local:      http://localhost:3000
```

Browser will automatically open at http://localhost:3000

---

## ✨ Step 5: Verify Installation

### Check Backend API:
```bash
# Test in another terminal
curl http://127.0.0.1:5000/health
```

Response should be:
```json
{"status":"ok","message":"AI Super-Resolution API is running"}
```

### Check Frontend:
- Open http://localhost:3000 in browser
- You should see the AI Super-Resolution interface
- Animated particles should be visible in background

---

## 🎯 Step 6: Test the Application

1. **Upload an image:**
   - Drag & drop or click upload area
   - Select any image (PNG, JPG, GIF, BMP)
   - Image preview should appear

2. **Enhance image:**
   - Click "Enhance Image" button
   - Loading spinner will appear
   - Wait for processing (usually 2-5 seconds)

3. **Compare results:**
   - Drag slider to compare original vs enhanced
   - Left side: Original
   - Right side: Enhanced

4. **Download:**
   - Click "Download Enhanced Image"
   - Image saves to Downloads folder

---

## 🛠️ Troubleshooting

### Issue: "Python not found"
**Solution:**
- Reinstall Python from https://www.python.org/
- During installation, CHECK "Add Python to PATH"
- Restart terminal after installation

### Issue: "pip not found"
**Solution:**
```bash
python -m pip --version
python -m pip install --upgrade pip
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: npm install fails
**Solution:**
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Backend connection error in React
**Solution:**
- Ensure backend is running on http://127.0.0.1:5000
- Check browser console (F12) for detailed errors
- Verify firewall isn't blocking port 5000
- Try: `curl http://127.0.0.1:5000/health`

### Issue: Large file won't upload
**Solution:**
- Maximum file size: 16MB
- Supported: PNG, JPG, GIF, BMP
- Convert image to smaller size first

### Issue: "Module not found" errors
**Solution:**
```bash
# For Python
pip install -r requirements.txt

# For Node
npm install
```

---

## 📁 Directory Structure After Setup

```
ai-super-resolution/
├── backend/
│   ├── venv/                 ← Virtual environment (created)
│   ├── app.py               ← Flask API
│   └── requirements.txt      ← Python dependencies
├── frontend/
│   ├── node_modules/        ← Packages (created)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   └── components/
│   │       └── Particles.js
│   └── package.json
├── README.md
├── QUICK_START.md
└── setup.bat
```

---

## 🚨 Important Notes

### Virtual Environment
- Always activate `venv` before running backend
- Deactivate with `deactivate` command
- Re-activate if opening new terminal

### npm Packages
- `node_modules` folder is large (~500MB)
- Don't commit to git (already in .gitignore)
- If missing, run `npm install`

### API Port
- Backend must run on 127.0.0.1:5000
- If you change port in app.py, update frontend's axios call
- Check `frontend/src/App.js` line: `http://127.0.0.1:5000/enhance`

### CORS
- Already enabled in Flask
- Frontend can call backend without issues
- Only test localhost during development

---

## 📊 Expected Performance

- **Backend startup:** < 2 seconds
- **Frontend startup:** < 10 seconds
- **Image enhancement:** 2-5 seconds (depends on image size)
- **Memory usage:** ~200MB (backend) + ~400MB (frontend)

---

## 🔄 Stopping Services

### Graceful shutdown:
```bash
# Backend terminal
Ctrl + C

# Frontend terminal
Ctrl + C
```

### Force kill (if stuck):
```bash
# Windows
taskkill /IM python.exe /F
taskkill /IM node.exe /F

# Mac/Linux
pkill -f python
pkill -f node
```

---

## 🎓 Next Steps

1. **Customize Design:**
   - Edit `frontend/src/index.css` for styling
   - Modify colors in `frontend/src/App.js`

2. **Enhance Algorithm:**
   - Edit `backend/app.py` enhancement function
   - Add real SRGAN model support

3. **Deploy:**
   - Use Docker for containerization
   - Deploy to Heroku, AWS, GCP, etc.

4. **Add Features:**
   - Batch processing
   - History/gallery
   - Advanced enhancement options
   - User accounts

---

## 🆘 Getting Help

1. **Check browser console:** F12 → Console tab
2. **Check backend logs:** Terminal where Flask runs
3. **Verify connectivity:** Test `/health` endpoint
4. **Check GitHub Issues:** For common problems
5. **Review README.md:** For detailed API documentation

---

## ✅ Success Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 14+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Browser opens to http://localhost:3000
- [ ] Health check passes
- [ ] Can upload and enhance images
- [ ] Download functionality works

Congratulations! Your AI Super-Resolution app is ready! 🎉
