import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion'; // For some animation

const NotFoundPage = () => {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 120px)', // Adjust based on header/footer height
    textAlign: 'center',
    padding: '2rem',
    color: 'var(--text-color)',
    backgroundColor: 'var(--background-color)',
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 10vw, 6rem)', // Responsive font size
    fontWeight: 'bold',
    color: 'var(--text-color)', // Or a specific accent color
    marginBottom: '1rem',
  };

  const messageStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  };

  const linkStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'transform 0.2s ease',
  };

  return (
    <motion.div
      style={pageStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Page Not Found (404) - School Name</title>
        <meta name="description" content="The page you are looking for could not be found on the School Name website." />
      </Helmet>
      <motion.h1
        style={titleStyle}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        404
      </motion.h1>
      <motion.p
        style={messageStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" style={linkStyle}>
          Go Back to Homepage
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
