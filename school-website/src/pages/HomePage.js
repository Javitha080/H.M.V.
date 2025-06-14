import React from 'react';
import HeroSection from '../components/HeroSection';
import { Helmet } from 'react-helmet'; // Import Helmet

const HomePage = () => {
  const pageStyle = { color: 'var(--text-color)' };
  return (
    <div style={pageStyle}>
      <Helmet>
        <title>Welcome to Our School - School Name</title>
        <meta name="description" content="Discover news, events, and information about Our School. Join our vibrant learning community." />
        <meta property="og:title" content="Welcome to Our School - School Name" />
        <meta property="og:description" content="Discover news, events, and information about Our School. Join our vibrant learning community." />
        {/* Add og:image with a default school image URL */}
        {/* <meta property="og:image" content="YOUR_DEFAULT_SCHOOL_IMAGE_URL" /> */}
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection />
      <div style={{padding: '1rem 2rem'}}>
        <h2>About Us</h2>
        <p>Some introductory content about the school can be placed here, below the hero section.</p>
      </div>
    </div>
  );
};
export default HomePage;
