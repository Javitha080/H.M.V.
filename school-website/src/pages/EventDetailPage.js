import React, { useState } from 'react'; // Added useState
import { useParams, Link } from 'react-router-dom';
import { sampleEventsData } from '../data/sampleData';
import LightboxModal from '../components/LightboxModal'; // Import LightboxModal
// import { Helmet } from 'react-helmet';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const eventItem = sampleEventsData.find(item => item.id === eventId);

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
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  };

  const playIconStyle = {
    fontSize: '3rem',
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

  if (!eventItem) {
    return (
      <div style={pageStyle}>
        <h2>Event Not Found</h2>
        <p>The event you are looking for does not exist or may have been moved.</p>
        <Link to="/events" style={backLinkStyle}>Back to Events</Link>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Link to="/events" style={backLinkStyle}>&larr; Back to All Events</Link>
      <h1>{eventItem.title}</h1>
      <div style={metadataStyle}>
        <span>Date: {eventItem.date}</span>
        {eventItem.category && <span style={categoryStyle}>{eventItem.category}</span>}
      </div>

      {eventItem.imageUrl && (
        <img
          src={eventItem.imageUrl}
          alt={eventItem.title}
          style={imageStyle}
          onClick={() => openLightbox(eventItem.imageUrl)}
        />
      )}
      {eventItem.videoUrl && !eventItem.imageUrl && (
        <div style={videoPlaceholderStyle}>
          <span style={playIconStyle}>&#9658;</span> {/* Play button Unicode character */}
          <span>Video Content (Player not implemented)</span>
        </div>
      )}

      <div className="content-body" style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
        <p>{eventItem.description}</p>
        {eventItem.id === 'event2' && <p>Your generous contributions can make a big difference. Please support our community initiative.</p>}
      </div>

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        imageUrl={lightboxImageUrl}
        altText={eventItem.title}
      />
    </div>
  );
};

export default EventDetailPage;
