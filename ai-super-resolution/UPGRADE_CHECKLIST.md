# 🔄 Real-ESRGAN Upgrade Migration Checklist

## Pre-Upgrade Phase

- [ ] **Backup current backend**
  ```bash
  cp -r backend backend.backup.old-opencv
  ```

- [ ] **Review current performance**
  - Note current enhancement speed
  - Test with various image types
  - Record baseline metrics

- [ ] **Check GPU availability** (optional but recommended)
  ```bash
  python -c "import torch; print('GPU:', torch.cuda.is_available())"
  ```

- [ ] **Verify disk space**
  - Need ~2GB for model + dependencies
  - Check: `df -h` or disk properties

## Installation Phase

- [ ] **Update dependencies**
  ```bash
  cd backend
  pip install -r requirements.txt
  ```
  Expected time: 5-10 minutes

- [ ] **Verify installation**
  ```bash
  python -c "import torch, basicsr, realesrgan"
  echo "All packages installed!"
  ```

- [ ] **First run (model download)**
  ```bash
  python app.py
  ```
  Expected time: 2-5 minutes
  Watch for: Model downloaded message

- [ ] **Check model file**
  ```bash
  ls -lh models/RealESRGAN_x4plus.pth
  ```
  Expected size: ~130MB

## Testing Phase

- [ ] **Health check**
  ```bash
  curl http://127.0.0.1:5000/health
  ```
  Expected: Status OK, GPU info

- [ ] **Model info**
  ```bash
  curl http://127.0.0.1:5000/model-info
  ```
  Expected: RealESRGAN_x4plus, 4x scale

- [ ] **Test enhancement (small image)**
  ```bash
  curl -X POST http://127.0.0.1:5000/enhance \
    -F "image=@test_small.jpg" \
    -o enhanced_small.png
  ```
  Expected: ~1-2 seconds

- [ ] **Verify output dimensions**
  ```bash
  python -c "from PIL import Image; \
    orig = Image.open('test_small.jpg'); \
    enhanced = Image.open('enhanced_small.png'); \
    print(f'Input: {orig.size}, Output: {enhanced.size}')"
  ```
  Expected: 4x larger

- [ ] **Test different formats**
  - [ ] PNG
  - [ ] JPG
  - [ ] GIF
  - [ ] BMP

- [ ] **Error handling tests**
  - [ ] Missing file (should error 400)
  - [ ] Wrong format (should error 400)
  - [ ] Large file (should error 400)

- [ ] **Performance benchmark**
  ```python
  import time, requests
  times = []
  for i in range(3):
      start = time.time()
      with open('test.jpg', 'rb') as f:
          requests.post('http://127.0.0.1:5000/enhance', 
                       files={'image': f})
      times.append(time.time() - start)
  print(f"Average: {sum(times)/len(times):.2f}s")
  ```

## Frontend Integration Phase

- [ ] **Start frontend**
  ```bash
  cd frontend
  npm start
  ```

- [ ] **Upload test image**
  - Drag & drop or click upload
  - Verify image appears

- [ ] **Click "Enhance Image"**
  - Watch loading spinner
  - Should complete in 1-2 seconds (GPU)

- [ ] **View result**
  - Image should be larger (4x)
  - Quality should be noticeably better
  - Slider should work

- [ ] **Download enhanced image**
  - Should save to Downloads
  - File should be PNG
  - Size should be 4x larger

- [ ] **Test with real images**
  - Blurry photo (should sharpen aggressively)
  - Clear photo (should enhance gently)
  - Document (text should be sharp)
  - Portrait (should preserve details)

## Performance Validation Phase

- [ ] **GPU acceleration** (if available)
  ```bash
  nvidia-smi -l 1  # Watch GPU usage
  # Should show ~30-50% GPU usage during enhancement
  ```

- [ ] **Memory usage** (during processing)
  - RAM: Should stay under 500MB
  - VRAM: Should stay under 1.2GB (if GPU)

- [ ] **Speed improvement**
  - Compare with old backend
  - Should be faster or similar quality (better)

- [ ] **Quality comparison**
  - Compare enhanced images
  - Should show noticeable improvement
  - Especially on blurry images

## Documentation Phase

- [ ] **Read documentation files**
  - [ ] README.md - Quick overview
  - [ ] BACKEND_UPGRADE.md - Technical details
  - [ ] UPGRADE_GUIDE.md - Setup instructions
  - [ ] ADVANCED_CONFIG.md - Tuning options
  - [ ] TESTING.md - Verification procedures

- [ ] **Update team documentation**
  - Share upgrade summary
  - Document performance metrics
  - List known limitations

## Production Deployment Phase

- [ ] **Update Docker image** (if using Docker)
  ```dockerfile
  # Update base image to support PyTorch
  FROM pytorch/pytorch:2.0.1-runtime-cuda11.8
  ```

- [ ] **Update deployment scripts**
  - Update requirements installation
  - Allocate more memory if needed
  - Enable GPU support

- [ ] **Set up monitoring**
  - Monitor GPU usage
  - Track processing time
  - Log errors

- [ ] **Configure for production**
  - Set `DEBUG = False`
  - Enable request logging
  - Set up backup/restart policies

- [ ] **Test production deployment**
  - Deploy to staging
  - Run load tests
  - Verify GPU access
  - Monitor resources

## Rollback Plan (If Needed)

- [ ] **Have backup ready**
  ```bash
  mv backend backend.new-esrgan
  mv backend.backup.old-opencv backend
  ```

- [ ] **Downgrade dependencies** (if needed)
  ```bash
  git checkout requirements.txt
  pip install -r requirements.txt
  ```

- [ ] **Restart services**
  ```bash
  python app.py  # Back to old version
  ```

## Sign-Off Checklist

### Technical
- [ ] All dependencies installed successfully
- [ ] Model downloaded and cached
- [ ] Health check responds correctly
- [ ] Enhancement works on all formats
- [ ] 4x upscaling confirmed
- [ ] Output quality verified
- [ ] Error handling tested
- [ ] Performance benchmarked

### Functional
- [ ] Frontend integration works
- [ ] Upload functionality works
- [ ] Enhancement produces results
- [ ] Download functionality works
- [ ] Comparison slider works
- [ ] UI responsive

### Quality
- [ ] Output images look professional
- [ ] No visual artifacts
- [ ] Colors accurate
- [ ] Details preserved
- [ ] Blur detection working
- [ ] Adaptive sharpening effective

### Performance
- [ ] GPU acceleration working (if available)
- [ ] Processing time acceptable
- [ ] Memory usage stable
- [ ] No memory leaks detected
- [ ] Error recovery works

### Documentation
- [ ] All docs reviewed
- [ ] Team trained
- [ ] Procedures documented
- [ ] Troubleshooting guide available

## Post-Upgrade Monitoring (First Week)

- [ ] **Daily**: Check error logs
- [ ] **Daily**: Verify GPU usage (if GPU deployed)
- [ ] **Daily**: Test with sample images
- [ ] **Daily**: Monitor performance metrics

- [ ] **Weekly**: Review performance trends
- [ ] **Weekly**: Collect user feedback
- [ ] **Weekly**: Verify model caching

## Signoff

- [ ] Project Manager: _________________ Date: _______
- [ ] Technical Lead: _________________ Date: _______
- [ ] DevOps Engineer: ________________ Date: _______
- [ ] QA Engineer: ___________________ Date: _______

## Notes

Space for additional notes, issues, or observations:

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## Summary

**Total Upgrade Time:** ~30-45 minutes  
**Risk Level:** Low (fully backward compatible)  
**Rollback Difficulty:** Easy (< 5 minutes)  

**Expected Benefits:**
- ✅ 4x image upscaling
- ✅ Professional-quality enhancement
- ✅ 10-50x faster with GPU
- ✅ Better results on real-world images

---

**Ready to upgrade? Follow this checklist for smooth deployment! ✅**
