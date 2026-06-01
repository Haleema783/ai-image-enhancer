import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@superresolution.local',
      description: 'Send us an email for inquiries'
    },
    {
      icon: '🔗',
      title: 'GitHub',
      content: 'github.com/project',
      description: 'Check out our source code'
    },
    {
      icon: '💬',
      title: 'Discussion',
      content: 'Project Forum',
      description: 'Join our academic community'
    }
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
    <div className="contact-page">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="contact-header"
        >
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">Have questions about our project? We'd love to hear from you!</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="form-section"
          >
            <h2>Send us a Message</h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message here..."
                    rows="5"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="methods-section"
          >
            <h2>Other Ways to Connect</h2>
            <motion.div 
              className="methods-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="method-card"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p className="method-content">{method.content}</p>
                  <p className="method-description">{method.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="info-box"
            >
              <h3>Project Information</h3>
              <ul>
                <li><strong>Type:</strong> Final Semester ML Project</li>
                <li><strong>Focus:</strong> Image Super-Resolution with Deep Learning</li>
                <li><strong>Model:</strong> Real-ESRGAN</li>
                <li><strong>Stack:</strong> React + Flask + PyTorch</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
