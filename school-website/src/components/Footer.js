import React from 'react';

const Footer = () => {
  // Basic styling for demonstration
  const footerStyle = {
    padding: '1rem',
    backgroundColor: 'var(--header-bg-color)', // Using header-bg for consistency, or define a specific footer-bg
    color: 'var(--text-color)',
    textAlign: 'center',
    marginTop: '2rem',
    borderTop: '1px solid var(--border-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-top-color 0.3s ease',
  };

  const linkStyle = {
    color: 'var(--text-color)',
    marginRight: '0.5rem',
    textDecoration: 'underline',
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>&copy; {new Date().getFullYear()} Your School Name. All Rights Reserved.</p>
        <p>School Address | Contact Info</p>
        <div className="social-links" style={{ marginTop: '0.5rem' }}>
          <a href="#" style={linkStyle}>Facebook</a>
          <a href="#" style={linkStyle}>Twitter</a>
          <a href="#" style={linkStyle}>Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
