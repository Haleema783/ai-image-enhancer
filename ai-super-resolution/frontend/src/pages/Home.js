import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  const features = [
    {
      icon: '🚀',
      title: 'AI-Powered',
      description: 'Real-ESRGAN deep learning model for state-of-the-art image enhancement'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      description: 'GPU-accelerated inference for quick image transformation'
    },
    {
      icon: '🎨',
      title: '4x Super-Resolution',
      description: 'Upscale images to 4x their original size while maintaining quality'
    },
    {
      icon: '🔬',
      title: 'Research-Grade',
      description: 'Built on cutting-edge deep learning techniques for academic excellence'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Image Super-Resolution
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle">
            Using Deep Learning with Web Interface
          </motion.p>
          <motion.p variants={itemVariants} className="hero-description">
            Transform low-quality images into high-resolution masterpieces using advanced AI technology. Our Real-ESRGAN model delivers stunning 4x super-resolution enhancement.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-buttons">
            <Link to="/enhance" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-glow"
          animate={{
            boxShadow: [
              '0 0 20px rgba(100, 181, 246, 0.3)',
              '0 0 40px rgba(100, 181, 246, 0.5)',
              '0 0 20px rgba(100, 181, 246, 0.3)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-header"
        >
          <h2>Why Choose Our Solution?</h2>
          <p>Powerful features built for academic and professional use</p>
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

      {/* How It Works */}
      <section className="how-it-works">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>How It Works</h2>
          <p>Simple steps to enhance your images</p>
        </motion.div>

        <div className="steps-container">
          {[
            { number: '1', title: 'Upload', description: 'Drag and drop or select a low-resolution image' },
            { number: '2', title: 'Process', description: 'AI model analyzes and enhances your image' },
            { number: '3', title: 'Compare', description: 'View before and after side by side' },
            { number: '4', title: 'Download', description: 'Save your enhanced image in high quality' },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < 3 && <div className="step-arrow">→</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="cta-content"
        >
          <h2>Ready to Transform Your Images?</h2>
          <p>Start enhancing your photos with our AI-powered super-resolution tool</p>
          <Link to="/enhance" className="btn btn-primary btn-large">
            Try It Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
