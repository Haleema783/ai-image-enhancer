# Advanced Backend Configuration

This guide covers advanced configuration options for optimal performance.

## 1. Tile Size Optimization

The tile size controls how images are processed in chunks to manage memory.

### Impact on Performance

```
Tile Size │ Speed    │ Memory   │ Quality  │ Best For
──────────┼──────────┼──────────┼──────────┼────────────────
100       │ Slowest  │ Lowest   │ Same     │ Limited RAM (2GB)
200       │ Slow     │ Low      │ Same     │ Moderate (4GB)
400       │ Normal   │ Moderate │ Same     │ Balanced (8GB) ★
600       │ Fast     │ High     │ Same     │ High RAM (16GB)
800+      │ Fastest  │ Highest  │ Same     │ GPU+High RAM (24GB)
```

### Recommended Settings

- **2GB RAM**: `TILE_SIZE = 100`
- **4GB RAM**: `TILE_SIZE = 200`
- **8GB RAM**: `TILE_SIZE = 400` (recommended)
- **16GB+ RAM**: `TILE_SIZE = 600-800`
- **GPU + 12GB VRAM**: `TILE_SIZE = 800`

## 2. Half Precision (FP16) vs Full Precision (FP32)

### Full Precision (FP32)
- **Pros**: Better quality, more stable
- **Cons**: Slower, more memory
- **Default on CPU**

### Half Precision (FP16)
- **Pros**: 2x faster, 2x less memory
- **Cons**: Minimal quality loss
- **Default on GPU (NVIDIA)**

## 3. Adaptive Sharpening Tuning

Real images have different blur levels. Adjust sharpening for your use case.

**Current defaults:**
```python
SHARPEN_STRENGTH_VERY_BLURRY = 1.4        # Strong
SHARPEN_STRENGTH_MODERATELY_BLURRY = 1.2  # Moderate
SHARPEN_STRENGTH_CLEAR = 1.0               # Light
```

**For different use cases:**
- **Portrait**: 1.0 (preserve natural texture)
- **Documents**: 1.3 (enhance text)
- **Video**: 1.1 (moderate)
- **Scientific**: 1.5 (maximum detail)

## 4. Quality vs File Size

| Quality | File Size | Use Case |
|---------|-----------|----------|
| 85      | Normal    | General use |
| 90      | +10%      | Standard |
| 95      | +20%      | ★ Default |
| 100     | +30%      | Archive |

## 5. Performance Benchmarking

Test your setup:

```bash
# Measure single image processing
curl -X POST http://127.0.0.1:5000/enhance \
  -F "image=@test.jpg" -w "\nTime: %{time_total}s\n"
```

Expected times:
- GPU (RTX 3080): 0.5-2 seconds
- CPU (i7): 8-30 seconds
- GPU (older): 5-10 seconds

## 6. Docker Deployment

```dockerfile
FROM pytorch/pytorch:2.0.1-runtime-cuda11.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY backend .
EXPOSE 5000
CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t esrgan-backend .
docker run --gpus all -p 5000:5000 esrgan-backend
```

## 7. Production Settings

In `app.py`, before running:
```python
# Development
DEBUG = True
app.run(debug=True, host='127.0.0.1', port=5000)

# Production
DEBUG = False
app.run(debug=False, host='0.0.0.0', port=5000)

# Use with Gunicorn
# gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

**Optimize for your needs! 🚀**
