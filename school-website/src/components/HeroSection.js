import React from 'react';
import { motion } from 'framer-motion'; // Import motion

const HeroSection = () => {
  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--text-color)',
    borderBottom: '1px solid var(--border-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-bottom-color 0.3s ease',
    overflow: 'hidden', // To contain floating elements if they go too wild
  };

  const titleStyle = { fontSize: '3rem', marginBlock: '0.5rem' };
  const subtitleStyle = { fontSize: '1.5rem', marginBlockEnd: '1.5rem', maxWidth: '600px' };
  const ctaButtonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block', // For motion.a to work well
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };
  const subtitleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
  };
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
    hover: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } } // Example hover
  };
  const floatingVariants = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: [0, 0.7, 0], y: [20, -20, 20], transition: { repeat: Infinity, duration: 4, delay, ease: "easeInOut" } },
  });


  return (
    <motion.section style={heroStyle} className="hero-section" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
      <motion.div style={{ position: 'absolute', top: '10%', left: '15%', fontSize: '3rem', opacity: 0.1 }} variants={floatingVariants(0)}>✨</motion.div>
      <motion.div style={{ position: 'absolute', bottom: '15%', right: '20%', fontSize: '2rem', opacity: 0.1 }} variants={floatingVariants(1)}>📚</motion.div>

      <motion.h1 style={titleStyle} variants={titleVariants}>Welcome to Our School</motion.h1>
      <motion.p style={subtitleStyle} variants={subtitleVariants}>
        Discover a place of learning, community, and growth. Explore our news and upcoming events.
      </motion.p>
      <motion.a href="#learn-more" style={ctaButtonStyle} variants={ctaVariants} whileHover="hover">
        Learn More
      </motion.a>
    </motion.section>
  );
};

export default HeroSection;
