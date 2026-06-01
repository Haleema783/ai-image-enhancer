# 🚀 Render Deployment - Quick Reference

Deploy your AI Super-Resolution app to Render in 5 minutes!

---

## ⚡ TL;DR - Quick Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy Backend on Render
- Go to https://dashboard.render.com
- Click "New" → "Web Service"
- Connect your GitHub repo
- Set runtime to **Python 3**
- Build: `pip install -r backend/requirements.txt`
- Start: `gunicorn --worker-class sync --workers 2 --timeout 60 --bind 0.0.0.0:$PORT backend.app:app`
- Add env vars:
  ```
  FLASK_ENV=production
  FLASK_APP=backend/app.py
  PYTHONUNBUFFERED=1
  ```
- Deploy & **note the URL** (e.g., `https://backend-xxxxx.onrender.com`)

### 3. Deploy Frontend on Render
- Click "New" → "Web Service" (again)
- Connect same repo
- Set runtime to **Node**
- Root directory: `frontend`
- Build: `npm ci && npm run build`
- Start: `npm start`
- Add env var:
  ```
  REACT_APP_API_URL=https://backend-xxxxx.onrender.com
  CI=false
  ```
- Deploy

### 4. Test
- Open frontend URL in browser
- Go to Enhance page
- Try uploading an image
- Download enhanced result ✅

---

## 📍 Important URLs

After deployment, you'll have:
- **Frontend**: `https://ai-super-resolution-frontend.onrender.com`
- **Backend**: `https://ai-super-resolution-backend.onrender.com`
- **Backend Health**: `https://ai-super-resolution-backend.onrender.com/health`

---

## ⚙️ Configuration Files Ready

- ✅ `render.yaml` - Full deployment config
- ✅ `backend/Procfile` - Backend start command
- ✅ `backend/requirements.txt` - Updated with gunicorn
- ✅ `frontend/.env.production` - Production API URL
- ✅ `backend/app.py` - Production CORS configured

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check logs → verify Python 3.8+ → check requirements.txt |
| Frontend can't connect | Check `REACT_APP_API_URL` is correct → check backend is running |
| Build fails | Check root directory is correct → verify package.json exists |
| Cold start slow | This is normal on free tier (30 sec first load) |

---

## 📚 Detailed Guide

See `RENDER_DEPLOYMENT.md` for full step-by-step instructions with screenshots and advanced options.

---

**Status**: Ready to deploy ✅
**Last Checked**: 2024
