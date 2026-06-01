# 🚀 Render Deployment Guide - AI Super-Resolution

Complete guide to deploy both backend and frontend to Render.com

---

## 📋 Prerequisites

1. **Render Account**: Sign up at https://render.com
2. **GitHub Repository**: Push your code to GitHub (required for Render)
3. **Git installed**: For pushing code to GitHub

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd ai-super-resolution
git init
git add .
git commit -m "Initial commit: AI Super-Resolution project"
git branch -M main
```

### 1.2 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-super-resolution.git
git push -u origin main
```

---

## 📦 Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended for Beginners)

1. **Login to Render**: https://dashboard.render.com

2. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Select your repo: `ai-super-resolution`

3. **Configure Web Service**:
   - **Name**: `ai-super-resolution-backend`
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r backend/requirements.txt
     ```
   - **Start Command**: 
     ```
     gunicorn --worker-class sync --workers 2 --timeout 60 --bind 0.0.0.0:$PORT backend.app:app
     ```
   - **Instance Type**: Free (or Starter for production)
   - **Region**: Choose closest to your users

4. **Environment Variables**:
   - Add these variables:
     ```
     FLASK_ENV=production
     FLASK_APP=backend/app.py
     PYTHONUNBUFFERED=1
     ```

5. **Deploy**: Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the URL: `https://ai-super-resolution-backend.onrender.com`

### Option B: Using render.yaml (Advanced)

1. The `render.yaml` file is already created in your project root

2. Push to GitHub:
   ```bash
   git add render.yaml backend/Procfile backend/requirements.txt
   git commit -m "Add Render deployment config"
   git push
   ```

3. Connect via Dashboard:
   - In Render, click "New" → "Create from YAML"
   - Select your GitHub repo
   - Render will auto-detect and deploy services from render.yaml

---

## 🎨 Step 3: Deploy Frontend to Render

### Important: Get Backend URL First!
Before deploying frontend, note your backend URL from Step 2 (e.g., `https://ai-super-resolution-backend.onrender.com`)

### 3.1 Update Frontend Environment Variables

Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://ai-super-resolution-backend.onrender.com
CI=false
```

Replace the URL with your actual backend URL from Step 2.

### 3.2 Create Frontend Web Service

1. **In Render Dashboard**: Click "New" → "Web Service"

2. **Configure**:
   - **Name**: `ai-super-resolution-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend` (important!)
   - **Runtime**: `Node`
   - **Node Version**: `18.17.0` (or latest)
   - **Build Command**: 
     ```
     npm ci && npm run build
     ```
   - **Start Command**: 
     ```
     npm start
     ```
   - **Instance Type**: Free (or Starter)
   - **Region**: Same as backend if possible

3. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://ai-super-resolution-backend.onrender.com
   CI=false
   ```

4. **Deploy**: Click "Create Web Service"
   - Wait for build & deployment (10-15 minutes)

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend API

Open in browser:
```
https://ai-super-resolution-backend.onrender.com/health
```

You should see:
```json
{
  "status": "ok",
  "device": "cpu",
  "gpu_available": false,
  "model": "Fallback OpenCV Lanczos (4x upscaling)",
  "using_fallback": true
}
```

### 4.2 Test Frontend

Open in browser:
```
https://ai-super-resolution-frontend.onrender.com
```

Navigate to "Enhance" page and test image upload/enhancement.

### 4.3 Troubleshooting

**Backend won't start:**
- Check logs: Render Dashboard → Backend Service → Logs
- Verify Python version (3.8+)
- Ensure gunicorn is in requirements.txt

**Frontend can't connect to backend:**
- Check console (F12) for CORS errors
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running first

**Build failures:**
- Check build logs in Render dashboard
- Ensure correct root directory specified
- Verify package.json exists

---

## 🔄 Step 5: Continuous Deployment (Auto-Deploy)

Both services are configured to auto-deploy on GitHub pushes.

### To deploy updates:

1. **Make changes locally**
2. **Commit & push to GitHub**:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. **Render automatically redeploys** (watch logs in dashboard)

---

## 📊 Monitoring & Logs

### View Backend Logs:
1. Render Dashboard → `ai-super-resolution-backend`
2. Click "Logs" tab
3. Scroll to see real-time logs

### View Frontend Logs:
1. Render Dashboard → `ai-super-resolution-frontend`
2. Click "Logs" tab

---

## 💰 Pricing Information

### Render Free Tier:
- **Web Services**: Free tier available
  - Automatically suspends after 15 minutes of inactivity
  - Auto-wakes on request (cold start ~30 seconds)
  - 0.5 CPU, 512MB RAM
  - 100GB bandwidth/month

### Paid Tiers:
- **Starter**: $7/month per service
  - Always running
  - 0.5 CPU, 512MB RAM
- **Standard**: $12/month per service
  - Full resources

**Recommendation**: Use Free tier for development/demo, upgrade to Starter for production.

---

## 🛠️ Advanced Configuration

### Adding Custom Domain

1. **In Render Dashboard**:
   - Select your service
   - Go to "Settings" → "Custom Domain"
   - Add your domain (e.g., `superresolution.com`)
   - Follow DNS instructions

### Database (Optional)

If you later need a database:
1. Render → "PostgreSQL" or "MySQL"
2. Add connection string to environment variables

### Environment Secrets

For sensitive variables (API keys):
1. Render Dashboard → Service → Environment
2. Use "Secret Files" for .env files

---

## 🚀 Additional Tips

### 1. **Cold Start Optimization**
Add to backend `app.py` after imports:
```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
```

### 2. **Performance**
- Use Starter tier for production (free tier is for demo)
- Add caching headers to frontend
- Consider CDN for images

### 3. **Monitoring**
- Enable Render email alerts for failures
- Monitor logs regularly

### 4. **SSL/TLS**
- Render automatically provides HTTPS
- No additional configuration needed

---

## 📝 Deployment Checklist

- [ ] GitHub account created and repo pushed
- [ ] Backend deployed on Render
- [ ] Backend health endpoint working
- [ ] Frontend environment variables updated
- [ ] Frontend deployed on Render
- [ ] Frontend can access backend API
- [ ] Test image enhancement end-to-end
- [ ] Verify all pages load correctly
- [ ] Check logs for errors
- [ ] Notify users of deployment URL

---

## 🆘 Common Issues & Solutions

### Issue: "Build failed: Module not found"
**Solution**: 
- Check requirements.txt has all dependencies
- Ensure package.json is in frontend root
- Verify file paths (case-sensitive on Linux)

### Issue: "Backend timeout"
**Solution**:
- Increase timeout: `gunicorn --timeout 120`
- First request may take 30s (cold start)
- Upgrade to Starter tier

### Issue: "CORS error in browser"
**Solution**:
- Verify Flask-CORS is enabled in app.py
- Check `REACT_APP_API_URL` is correct
- Test health endpoint directly

### Issue: "Free tier service suspended"
**Solution**:
- Free tier auto-suspends after 15 min inactivity
- Upgrade to Starter tier for always-on
- Or accept cold start delays

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **GitHub Issues**: Add issues to your repo
- **Status Page**: https://status.render.com

---

## 🎉 You're Done!

Your AI Super-Resolution app is now live on Render!

**Frontend URL**: `https://ai-super-resolution-frontend.onrender.com`
**Backend API**: `https://ai-super-resolution-backend.onrender.com`

Share the frontend URL with others to try the app!

---

*Last Updated: 2024*
*Project: AI Image Super-Resolution Using Deep Learning*
