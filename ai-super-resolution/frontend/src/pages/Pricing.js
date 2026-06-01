import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Tier',
      price: 'Free',
      description: 'Perfect for trying out image super-resolution',
      features: [
        '✓ Basic image enhancement',
        '✓ Up to 4x resolution',
        '✓ Standard processing speed',
        '✓ PNG output format',
        '✓ Up to 5 images/day'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro Tier',
      price: 'Academic',
      description: 'For research and learning purposes',
      features: [
        '✓ Advanced image enhancement',
        '✓ Up to 4x resolution',
        '✓ GPU-accelerated processing',
        '✓ Multiple output formats',
        '✓ Unlimited processing',
        '✓ Batch processing support',
        '✓ API access',
        '✓ Model configuration options'
      ],
      cta: 'For Students',
      highlighted: true
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
    <div className="pricing-page">
      <motion.div
        className="pricing-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="pricing-title">Simple Pricing</h1>
          <p className="pricing-subtitle">Choose the plan that works best for you</p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {plan.highlighted && (
                <div className="badge">Most Popular for Academia</div>
              )}

              <h2 className="plan-name">{plan.name}</h2>
              <div className="price-section">
                <span className="plan-price">{plan.price}</span>
              </div>
              <p className="plan-description">{plan.description}</p>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <Link to="/enhance" className={`cta-button ${plan.highlighted ? 'primary' : 'secondary'}`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.section
          className="faq-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our service</p>
          </div>

          <div className="faq-grid">
            {[
              {
                q: 'How does the image enhancement work?',
                a: 'We use Real-ESRGAN, a state-of-the-art deep learning model that enhances low-resolution images to 4x their original size while preserving details.'
              },
              {
                q: 'What formats are supported?',
                a: 'We support PNG, JPG, GIF, and BMP input formats. Output is always PNG for maximum quality.'
              },
              {
                q: 'How long does processing take?',
                a: 'Processing typically takes 0.8-8 seconds depending on image size and whether GPU acceleration is available.'
              },
              {
                q: 'Is my data private?',
                a: 'Yes, this is an academic project for learning purposes. Images are processed locally and not stored.'
              },
              {
                q: 'Can I use this for commercial purposes?',
                a: 'This is an academic project. Please review the project license for usage terms.'
              },
              {
                q: 'How accurate is the enhancement?',
                a: 'Real-ESRGAN provides realistic upscaling suitable for academic and professional use. Results vary based on input image quality.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="final-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to get started?</h2>
          <p>Start enhancing your images with our AI-powered super-resolution tool today</p>
          <Link to="/enhance" className="cta-button primary">
            Try it Now
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Pricing;
