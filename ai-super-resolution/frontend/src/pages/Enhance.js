import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCompareImage from 'react-compare-image';
import { BeatLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import '../styles/Enhance.css';

// Get API URL from environment or fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

const Enhance = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  // 📤 Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setEnhancedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    }
  });

  // 🚀 MAIN API CALL (FIXED)
  const enhanceImage = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert base64 → blob
      const res = await fetch(uploadedImage);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("image", blob, fileName);

      // Send to Flask backend
      const response = await fetch(`${API_URL}/enhance`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      // Get enhanced image
      const resultBlob = await response.blob();
      const imageUrl = URL.createObjectURL(resultBlob);

      setEnhancedImage(imageUrl);

    } catch (err) {
      console.log(err);
      setError(`⚠️ Backend not connected. Make sure the API is running at ${API_URL}`);
    } finally {
      setLoading(false);
    }
  };

  // 📥 Download image
  const downloadEnhancedImage = () => {
    if (!enhancedImage) return;

    fetch(enhancedImage)
      .then(res => res.blob())
      .then(blob => {
        const timestamp = new Date().toISOString().slice(0, 10);
        saveAs(blob, `enhanced_${timestamp}.png`);
      })
      .catch(err => console.error('Download error:', err));
  };

  return (
    <div className="enhance-page">
      <motion.div
        className="enhance-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* HEADER */}
        <motion.div
          className="enhance-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="enhance-title">Enhance Your Images</h1>
          <p className="enhance-subtitle">
            Upload an image and enhance it using AI (Real-ESRGAN)
          </p>
        </motion.div>

        {/* MAIN */}
        <div className="enhance-content">

          {/* UPLOAD */}
          {!uploadedImage ? (
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <p>📤 Drop image here or click to upload</p>
              <span>PNG, JPG, GIF, BMP</span>
            </div>
          ) : (
            <div>

              {/* ORIGINAL IMAGE */}
              {!enhancedImage && (
                <div className="uploaded-image-container">
                  <img src={uploadedImage} alt="uploaded" />
                  <button onClick={enhanceImage} disabled={loading}>
                    {loading ? <BeatLoader size={8} /> : "Enhance Image"}
                  </button>
                </div>
              )}

              {/* RESULT */}
              {enhancedImage && (
                <div>
                  <ReactCompareImage
                    leftImage={uploadedImage}
                    rightImage={enhancedImage}
                  />

                  <div style={{ marginTop: "20px" }}>
                    <button onClick={downloadEnhancedImage}>
                      Download
                    </button>

                    <button onClick={() => {
                      setUploadedImage(null);
                      setEnhancedImage(null);
                      setError(null);
                    }}>
                      Try Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ERROR */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default Enhance;