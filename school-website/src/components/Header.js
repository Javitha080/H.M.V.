import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use context

  // Basic styling for demonstration, can be moved to a CSS file
  const headerStyle = {
    padding: '1rem',
    backgroundColor: 'var(--header-bg-color)', // Use CSS variable
    borderBottom: '1px solid var(--border-color)', // Use CSS variable
    color: 'var(--text-color)', // Use CSS variable for text too
    transition: 'background-color 0.3s ease, color 0.3s ease, border-bottom-color 0.3s ease',
  };

  const navLinkStyle = {
    color: 'var(--text-color)', // Ensure links also use theme color
    textDecoration: 'none',
  };

  const logoLinkStyle = {
    color: 'var(--text-color)', // Ensure logo also use theme color
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="logo">
          <Link to="/" style={logoLinkStyle}>School Logo</Link>
        </div>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
            <li><Link to="/" style={navLinkStyle}>Home</Link></li>
            <li><Link to="/news" style={navLinkStyle}>News</Link></li>
            <li><Link to="/events" style={navLinkStyle}>Events</Link></li>
          </ul>
        </nav>
        <div>
          <button onClick={toggleTheme} style={{ padding: '0.5rem', cursor: 'pointer' }}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
