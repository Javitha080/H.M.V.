import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

const Card = ({ type, id, title, description, imageUrl, videoUrl, category, date, linkTo }) => {
  const cardStyle = { // Base styles, non-animated
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '0', // Padding will be inside motion.div
    margin: '1rem', // This should be on the motion.div or its parent grid
    maxWidth: '350px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Ensure image corners are clipped by border radius
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease', // For theme changes
  };

  const imagePlaceholderStyle = { /* ... same as before ... */ };
  // ... other styles remain similar, ensure they don't conflict with motion props ...

  const cardVariants = {
    initial: { opacity: 0.8, y: 10 },
    hover: {
      y: -5,
      scale: 1.03,
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      transition: { type: 'spring', stiffness: 300 }
    },
    rest: { opacity: 1, y: 0, scale: 1, boxShadow: '0 4px 8px rgba(0,0,0,0.1)'} // Ensure it returns to this
  };

  // Styles from previous cardStyle that need to be on the inner content div
  const contentPaddingStyle = {
    padding: '1rem',
  };
   const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBlock: '0.5rem',
    color: 'var(--text-color)',
  };
  const descriptionStyle = {
    fontSize: '0.9rem',
    flexGrow: 1,
    marginBottom: '1rem',
  };
  const categoryStyle = {
    display: 'inline-block',
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  };
  const dateStyle = {
    fontSize: '0.8rem',
    opacity: 0.7,
    marginBottom: '0.5rem',
  };


  return (
    <motion.div
      variants={cardVariants}
      initial="rest" // Start at 'rest'
      whileHover="hover"
      animate="rest" // Animate to 'rest' when not hovering (needed if other animations change it)
      style={{...cardStyle, margin: '1rem'}} // Apply margin here for grid layout
    >
      <Link
        to={linkTo || (type === 'news' ? `/news/${id}` : `/events/${id}`)}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        className="card-link-internal"
      >
        {imageUrl && <motion.img src={imageUrl} alt={title} style={{width: '100%', height: '180px', objectFit: 'cover' /* borderRadius removed, handled by parent overflow */}} />}
        {videoUrl && !imageUrl && (
          <div style={{width: '100%', height: '180px', backgroundColor: '#ccc', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span>Video Preview</span>
          </div>
        )}
        {!imageUrl && !videoUrl && (
           <div style={{width: '100%', height: '180px', backgroundColor: '#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span>Image/Video Placeholder</span>
          </div>
        )}

        <div style={contentPaddingStyle}>
          {category && <span style={categoryStyle}>{category}</span>}
          <h3 style={titleStyle}>{title || 'Card Title'}</h3>
          {date && <p style={dateStyle}>{date}</p>}
          <p style={descriptionStyle}>{description || 'Short description of the news or event goes here.'}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
