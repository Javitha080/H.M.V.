import React from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ isLoading }) => {
  if (!isLoading) return null;

  const preloaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--background-color)', // Use theme background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  };

  const logoPlaceholderStyle = {
    width: '100px',
    height: '100px',
    // Placeholder for animated logo - e.g. SVG animation or spinning image
    // For now, a simple spinning div
  };

  const spinnerVariants = {
      animate: {
          rotate: 360,
          transition: {
              loop: Infinity,
              ease: "linear",
              duration: 1
          }
      }
  };

  return (
    <motion.div
        style={preloaderStyle}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }} // Animate out when isLoading becomes false
    >
      <motion.div
        style={{...logoPlaceholderStyle, border: '5px solid var(--text-color)', borderTopColor: 'transparent', borderRadius: '50%'}}
        variants={spinnerVariants}
        animate="animate"
      >
      </motion.div>
      <p style={{ marginTop: '1rem', color: 'var(--text-color)', fontSize: '1.2rem' }}>Loading...</p>
      {/* Placeholder for school logo animation */}
    </motion.div>
  );
};

export default Preloader;
