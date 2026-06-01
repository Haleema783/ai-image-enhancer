import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  const technologies = [
    { icon: '🧠', title: 'Real-ESRGAN', description: 'State-of-the-art super-resolution model with 23 residual blocks' },
    { icon: '⚙️', title: 'PyTorch', description: 'Deep learning framework for efficient model inference' },
    { icon: '🔧', title: 'Flask Backend', description: 'RESTful API for seamless image processing' },
    { icon: '⚛️', title: 'React Frontend', description: 'Modern UI with smooth animations and drag-drop support' }
  ];

  const features = [
    { icon: '📈', title: '4x Super-Resolution', description: 'Upscale images to 4x their original size' },
    { icon: '⚡', title: 'GPU Acceleration', description: 'CUDA support for fast image enhancement' },
    { icon: '🎨', title: 'Smart Preprocessing', description: 'Automatic image normalization and RGB conversion' },
    { icon: '✨', title: 'Adaptive Sharpening', description: 'Intelligent post-processing for clarity' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="about-page">
      {/* About Section */}
      <section className="about-section">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-title">About This Project</h1>
          <p className="about-description">
            This is a final semester machine learning project that demonstrates the application of deep learning 
            for image super-resolution. We've implemented Real-ESRGAN, a cutting-edge generative adversarial network 
            designed to enhance low-resolution images to high-resolution outputs with realistic details.
          </p>
          <p className="about-description">
            The project showcases a complete pipeline from backend model inference to a user-friendly web interface, 
            demonstrating practical machine learning deployment and full-stack web development.
          </p>
        </motion.div>
      </section>

      {/* ML Model Section */}
      <section className="model-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>The Deep Learning Model</h2>
          <p>Real-ESRGAN: Practical Blind Real-World Super-Resolution</p>
        </motion.div>

        <motion.div 
          className="model-details"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="detail-card">
            <h3>🏗️ Architecture</h3>
            <p>RealESRGAN_x4plus with 23 residual blocks and 64 feature channels, trained on diverse datasets to handle real-world degradation.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="detail-card">
            <h3>📊 Training Data</h3>
            <p>Trained on DIV2K, Flickr2K, and other high-quality image datasets to ensure robust performance across various image types.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="detail-card">
            <h3>⚙️ Upscaling</h3>
            <p>Guaranteed 4x magnification with tile-based processing for memory efficiency and handling of large images.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="detail-card">
            <h3>🎯 Performance</h3>
            <p>0.8s on GPU (RTX 3080) to 8s on CPU (i7) for 512×512 images, with adaptive post-processing for visual clarity.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Technology Stack</h2>
          <p>Built with modern tools and frameworks</p>
        </motion.div>

        <motion.div 
          className="tech-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="tech-icon">{tech.icon}</div>
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Key Features</h2>
          <p>What makes our implementation special</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technical Approach */}
      <section className="approach-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Technical Approach</h2>
          <p>Our processing pipeline</p>
        </motion.div>

        <div className="approach-steps">
          {[
            {
              number: '1',
              title: 'Input Validation',
              description: 'Validate image dimensions and format, resize if necessary'
            },
            {
              number: '2',
              title: 'Preprocessing',
              description: 'Normalize pixel values and convert to RGB if needed'
            },
            {
              number: '3',
              title: 'Model Inference',
              description: 'Run Real-ESRGAN with tile-based processing for efficiency'
            },
            {
              number: '4',
              title: 'Post-Processing',
              description: 'Apply adaptive sharpening based on blur detection'
            },
            {
              number: '5',
              title: 'Output Generation',
              description: 'Encode enhanced image as PNG with quality preservation'
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="approach-step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="step-circle">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
