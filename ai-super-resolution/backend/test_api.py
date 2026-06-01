#!/usr/bin/env python
"""
Test script for Image Enhancement API
Tests both the backend and image processing pipeline
"""

import requests
import numpy as np
from PIL import Image
import io
import sys
import time

# Configuration
BACKEND_URL = "http://127.0.0.1:5000"
HEALTH_ENDPOINT = f"{BACKEND_URL}/health"
ENHANCE_ENDPOINT = f"{BACKEND_URL}/enhance"

def create_test_image(width=128, height=128):
    """Create a test image (blurry gradient)"""
    print(f"Creating test image ({width}x{height})...")
    
    # Create a gradient image
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    for i in range(height):
        for j in range(width):
            img_array[i, j] = [int((i / height) * 255), int((j / width) * 255), 128]
    
    # Apply Gaussian blur to make it look real
    from cv2 import GaussianBlur
    img_array = GaussianBlur(img_array, (5, 5), 0)
    
    img = Image.fromarray(img_array, 'RGB')
    return img

def test_health():
    """Test health endpoint"""
    print("\n" + "="*60)
    print("Testing Health Endpoint")
    print("="*60)
    
    try:
        response = requests.get(HEALTH_ENDPOINT, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health Check Passed")
            print(f"   Status: {data.get('status')}")
            print(f"   Device: {data.get('device')}")
            print(f"   GPU Available: {data.get('gpu_available')}")
            print(f"   Model: {data.get('model')}")
            return True
        else:
            print(f"❌ Health Check Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

def test_enhancement():
    """Test image enhancement endpoint"""
    print("\n" + "="*60)
    print("Testing Image Enhancement")
    print("="*60)
    
    try:
        # Create test image
        test_img = create_test_image(256, 256)
        
        # Save to bytes
        img_bytes = io.BytesIO()
        test_img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        # Prepare request
        files = {'image': ('test.png', img_bytes, 'image/png')}
        
        print("Sending image to backend...")
        print(f"  Image size: {test_img.size}")
        print(f"  Image format: {test_img.format}")
        
        # Send request
        response = requests.post(ENHANCE_ENDPOINT, files=files, timeout=60)
        
        if response.status_code == 200:
            # Save enhanced image
            enhanced_img = Image.open(io.BytesIO(response.content))
            enhanced_img.save('test_enhanced.png')
            
            print(f"✅ Image Enhancement Successful!")
            print(f"   Input size: {test_img.size}")
            print(f"   Output size: {enhanced_img.size}")
            print(f"   Upscale factor: {enhanced_img.size[0] / test_img.size[0]}x")
            print(f"   Output saved: test_enhanced.png")
            return True
        else:
            print(f"❌ Enhancement Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("Image Enhancement API - Test Suite")
    print("="*60)
    
    # Test health
    health_ok = test_health()
    
    if not health_ok:
        print("\n❌ Backend is not responding. Make sure it's running on port 5000")
        sys.exit(1)
    
    # Test enhancement
    enhancement_ok = test_enhancement()
    
    # Summary
    print("\n" + "="*60)
    print("Test Summary")
    print("="*60)
    print(f"Health Check: {'✅ PASSED' if health_ok else '❌ FAILED'}")
    print(f"Enhancement: {'✅ PASSED' if enhancement_ok else '❌ FAILED'}")
    
    if health_ok and enhancement_ok:
        print("\n✅ All tests passed! Backend is working correctly.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. Check the errors above.")
        sys.exit(1)

if __name__ == '__main__':
    main()
