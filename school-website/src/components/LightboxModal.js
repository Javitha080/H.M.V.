import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

const LightboxModal = ({ isOpen, onClose, imageUrl, altText }) => {
  useEffect(() => {
    const handleEscKey = (event) => { if (event.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  const overlayStyle = { /* ... same as before ... */ };
  const contentStyle = { /* ... same as before ... */ };
  const imageStyle = { /* ... same as before ... */ };
  const closeButtonStyle = { /* ... same as before ... */ };

  // Copied from your initial LightboxModal.js comment
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: {duration: 0.3}}
  };
  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0, transition: {duration: 0.3, ease: "easeOut"} },
    exit: { scale: 0.8, opacity: 0, y: 50, transition: {duration: 0.2, ease: "easeIn"} }
  };

  // Styles from previous definition
  overlayStyle.position = 'fixed';
  overlayStyle.top = 0;
  overlayStyle.left = 0;
  overlayStyle.right = 0;
  overlayStyle.bottom = 0;
  overlayStyle.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlayStyle.display = 'flex';
  overlayStyle.alignItems = 'center';
  overlayStyle.justifyContent = 'center';
  overlayStyle.zIndex = 1000;
  overlayStyle.backdropFilter = 'blur(5px)';

  contentStyle.position = 'relative';
  contentStyle.padding = '10px';
  contentStyle.backgroundColor = 'var(--card-bg-color)';
  contentStyle.borderRadius = '8px';
  contentStyle.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';

  imageStyle.display = 'block';
  imageStyle.maxWidth = '90vw';
  imageStyle.maxHeight = '90vh';
  imageStyle.objectFit = 'contain';
  imageStyle.borderRadius = '4px';

  closeButtonStyle.position = 'absolute';
  closeButtonStyle.top = '-10px';
  closeButtonStyle.right = '-10px';
  closeButtonStyle.background = 'var(--text-color)';
  closeButtonStyle.color = 'var(--background-color)';
  closeButtonStyle.border = 'none';
  closeButtonStyle.borderRadius = '50%';
  closeButtonStyle.width = '30px';
  closeButtonStyle.height = '30px';
  closeButtonStyle.fontSize = '16px';
  closeButtonStyle.cursor = 'pointer';
  closeButtonStyle.display = 'flex';
  closeButtonStyle.alignItems = 'center';
  closeButtonStyle.justifyContent = 'center';
  closeButtonStyle.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            style={overlayStyle}
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="exit" // Changed from "hidden" to "exit" to use specific exit animation
            variants={backdropVariants}
        >
          <motion.div
            style={contentStyle}
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // Changed from "hidden" to "exit"
          >
            <button style={closeButtonStyle} onClick={onClose}>&times;</button>
            <img src={imageUrl} alt={altText || 'Lightbox image'} style={imageStyle} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxModal;
