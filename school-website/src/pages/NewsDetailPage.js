import React, { useState } from 'react'; // Added useState
import { useParams, Link } from 'react-router-dom';
import { sampleNewsData } from '../data/sampleData';
import LightboxModal from '../components/LightboxModal'; // Import LightboxModal
// import { Helmet } from 'react-helmet';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const newsItem = sampleNewsData.find(item => item.id === newsId);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState('');

  const openLightbox = (url) => {
    setLightboxImageUrl(url);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImageUrl('');
  };

  const pageStyle = {
    padding: '1rem 2rem',
    color: 'var(--text-color)',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    cursor: 'pointer', // Make image clickable
  };

  const videoPlaceholderStyle = {
    width: '100%',
    height: '450px',
    backgroundColor: '#333', // Darker for video
    color: 'white',
    display: 'flex',
    flexDirection: 'column', // To stack icon and text
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    // cursor: 'pointer', // Could also open a video player modal
  };

  const playIconStyle = {
    fontSize: '3rem', // Larger play icon
    marginBottom: '0.5rem',
  };

  const metadataStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    opacity: 0.8,
    marginBottom: '1rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.5rem',
  };

  const categoryStyle = {
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
  };

  const backLinkStyle = {
    display: 'inline-block',
    margin: '2rem 0',
    color: 'var(--text-color)',
    textDecoration: 'underline',
  };

  if (!newsItem) {
    return (
      <div style={pageStyle}>
        <h2>News Item Not Found</h2>
        <p>The news article you are looking for does not exist or may have been moved.</p>
        <Link to="/news" style={backLinkStyle}>Back to News</Link>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Link to="/news" style={backLinkStyle}>&larr; Back to All News</Link>
      <h1>{newsItem.title}</h1>
      <div style={metadataStyle}>
        <span>Published on: {newsItem.date}</span>
        {newsItem.category && <span style={categoryStyle}>{newsItem.category}</span>}
      </div>

      {newsItem.imageUrl && (
        <img
          src={newsItem.imageUrl}
          alt={newsItem.title}
          style={imageStyle}
          onClick={() => openLightbox(newsItem.imageUrl)}
        />
      )}
      {newsItem.videoUrl && !newsItem.imageUrl && (
        <div style={videoPlaceholderStyle}>
          <span style={playIconStyle}>&#9658;</span> {/* Play button Unicode character */}
          <span>Video Content (Player not implemented)</span>
        </div>
      )}

      <div className="content-body" style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
        <p>{newsItem.description}</p>
        {newsItem.id === 'news1' && <p>The event was a testament to the vibrant spirit of our school community. More details about individual performances will be shared soon.</p>}
      </div>

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        imageUrl={lightboxImageUrl}
        altText={newsItem.title}
      />
    </div>
  );
};

export default NewsDetailPage;
