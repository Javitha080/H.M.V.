import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'; // If admin/user links differ

const MobileNavMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth(); // Example: if you want to show admin link

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const menuVariants = {
    hidden: { x: '100%', opacity: 0.8 }, // Slide in from right
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.3 } },
    exit: { x: '100%', opacity: 0.8, transition: { duration: 0.2 } },
  };

  const navLinkStyle = {
    display: 'block',
    padding: '1rem 1.5rem',
    fontSize: '1.2rem',
    color: 'var(--text-color)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--border-color)',
  };

  const lastNavLinkStyle = { ...navLinkStyle, borderBottom: 'none' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay
            zIndex: 1900, // Below modal, above header potentially
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose} // Close when clicking overlay
        >
          <motion.nav
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(80vw, 300px)', // Max 300px width, or 80% of viewport
              height: '100%',
              backgroundColor: 'var(--card-bg-color)', // Themed background
              boxShadow: '-5px 0 15px rgba(0,0,0,0.2)',
              paddingTop: '3rem', // Space for close button or header offset
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none',
                    fontSize: '1.8rem', color: 'var(--text-color)', cursor: 'pointer'
                }}
            >&times;</button>

            <Link to="/" style={navLinkStyle} onClick={onClose}>Home</Link>
            <Link to="/news" style={navLinkStyle} onClick={onClose}>News</Link>
            <Link to="/events" style={navLinkStyle} onClick={onClose}>Events</Link>
            {/* Add other links as needed, e.g., About, Contact */}
            {/* {user && <Link to="/admin/dashboard" style={lastNavLinkStyle} onClick={onClose}>Admin Dashboard</Link>} */}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavMenu;
