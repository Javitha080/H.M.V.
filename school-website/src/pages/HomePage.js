import React from 'react';
import HeroSection from '../components/HeroSection'; // Import HeroSection

const HomePage = () => {
  const pageStyle = {
    // Removed padding from here as HeroSection will manage its own
    color: 'var(--text-color)' // Ensure page text uses theme color if any content outside Hero
  };
  return (
    <div style={pageStyle}>
      <HeroSection />
      {/* Other homepage content can go here */}
      <div style={{padding: '1rem'}}>
        <h2>About Us</h2>
        <p>Some introductory content about the school can be placed here, below the hero section.</p>
        <p>This part will also respect the global theme settings for text and background.</p>
      </div>
    </div>
  );
};

export default HomePage;
