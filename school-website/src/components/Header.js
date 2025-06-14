import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import MobileNavMenu from './MobileNavMenu'; // Import MobileNavMenu
// import { motion } from 'framer-motion'; // If needed for hamburger icon animation

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile && isMobileMenuOpen) { // Close mobile menu if window resized to desktop
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const headerStyle = {
    padding: '1rem 1.5rem', // Increased padding slightly
    backgroundColor: 'var(--header-bg-color)',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-bottom-color 0.3s ease',
    position: 'sticky', // Make header sticky
    top: 0,
    zIndex: 1000, // Ensure header is above most content but below modals/mobile menu overlay
  };

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const navLinkStyle = { color: 'var(--text-color)', textDecoration: 'none', padding: '0.5rem 0.8rem' };
  const logoLinkStyle = { color: 'var(--text-color)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem' };

  const hamburgerIconStyle = {
    fontSize: '1.8rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-color)',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'flex', // For better alignment of icon if using SVG or multiple lines
    alignItems: 'center',
    justifyContent: 'center',
  };

  const desktopNavStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '0.5rem', // Reduced gap slightly
    margin: 0,
    padding: 0,
  };

  const themeToggleButtonStyle = {
    padding: '0.5rem 0.8rem',
    cursor: 'pointer',
    backgroundColor: 'var(--card-bg-color)', // Themed button
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '5px',
    marginLeft: '1rem', // Space from nav or hamburger
  };


  return (
    <>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <div className="logo">
            <Link to="/" style={logoLinkStyle}>School Logo</Link>
          </div>

          {isMobileView ? (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <button onClick={toggleTheme} style={{...themeToggleButtonStyle, marginRight: '0.5rem', marginLeft: '0'}}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    style={hamburgerIconStyle}
                    aria-label="Open navigation menu"
                >
                    &#9776; {/* Hamburger icon (Unicode) */}
                </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <nav>
                <ul style={desktopNavStyle}>
                  <li><Link to="/" style={navLinkStyle}>Home</Link></li>
                  <li><Link to="/news" style={navLinkStyle}>News</Link></li>
                  <li><Link to="/events" style={navLinkStyle}>Events</Link></li>
                  {/* Add other links here */}
                </ul>
              </nav>
              <button onClick={toggleTheme} style={themeToggleButtonStyle}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          )}
        </div>
      </header>
      <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
export default Header;
