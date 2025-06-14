import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LightboxModal from '../components/LightboxModal';
import { Helmet } from 'react-helmet'; // Import Helmet

const EventDetailPage = () => {
  const { eventId: idOrSlug } = useParams();
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState('');

  useEffect(() => {
    const fetchEventItem = async () => {
      if (!idOrSlug) { setError("Event identifier not found in URL."); setLoading(false); return; }
      setLoading(true); setError(null);
      try {
        let query = supabase.from('events').select('*');
        if (idOrSlug.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
          query = query.eq('id', idOrSlug);
        } else {
          query = query.eq('slug', idOrSlug);
        }
        const { data, error: fetchError } = await query.single();
        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
        if (!data) { setError('Event not found.'); }
        else { setEventItem(data); }
      } catch (e) { console.error('Error fetching event details:', e); setError(e.message || 'Failed to fetch event.');
      } finally { setLoading(false); }
    }; // Defined fetchEventItem
    fetchEventItem(); // Call the async function
  }, [idOrSlug]);

  const openLightbox = (url) => { setLightboxImageUrl(url); setIsLightboxOpen(true); };
  const closeLightbox = () => { setIsLightboxOpen(false); setLightboxImageUrl(''); };

  const pageStyle = { /* ... */ }; const imageStyle = { /* ... */ };
  const videoPlaceholderStyle = { /* ... */ }; const playIconStyle = { /* ... */ };
  const metadataStyle = { /* ... */ }; const categoryStyle = { /* ... */ };
  const backLinkStyle = { /* ... */ };
  // Ensure styles are defined or imported
  pageStyle.padding = '1rem 2rem'; pageStyle.color = 'var(--text-color)'; pageStyle.maxWidth = '900px'; pageStyle.margin = '0 auto';
  imageStyle.width = '100%'; imageStyle.maxHeight = '450px'; imageStyle.objectFit = 'cover'; imageStyle.borderRadius = '8px'; imageStyle.marginBottom = '1.5rem'; imageStyle.cursor = 'pointer';
  videoPlaceholderStyle.width = '100%'; videoPlaceholderStyle.height = '450px'; videoPlaceholderStyle.backgroundColor = '#333'; videoPlaceholderStyle.color = 'white'; videoPlaceholderStyle.display = 'flex'; videoPlaceholderStyle.flexDirection = 'column'; videoPlaceholderStyle.alignItems = 'center'; videoPlaceholderStyle.justifyContent = 'center'; videoPlaceholderStyle.borderRadius = '8px'; videoPlaceholderStyle.marginBottom = '1.5rem'; videoPlaceholderStyle.fontSize = '1.5rem';
  playIconStyle.fontSize = '3rem'; playIconStyle.marginBottom = '0.5rem';
  metadataStyle.fontSize = '0.9rem'; metadataStyle.opacity = 0.8; metadataStyle.marginBottom = '1rem'; metadataStyle.borderBottom = '1px solid var(--border-color)'; metadataStyle.paddingBottom = '0.5rem'; metadataStyle.display = 'flex'; metadataStyle.flexWrap = 'wrap'; metadataStyle.gap = '1rem'; // Added for better layout
  categoryStyle.backgroundColor = 'var(--text-color)'; categoryStyle.color = 'var(--background-color)'; categoryStyle.padding = '0.25rem 0.75rem'; categoryStyle.borderRadius = '15px'; categoryStyle.fontSize = '0.8rem';
  backLinkStyle.display = 'inline-block'; backLinkStyle.margin = '2rem 0 1rem'; backLinkStyle.color = 'var(--text-color)'; backLinkStyle.textDecoration = 'underline';


  if (loading) return <div style={pageStyle}><p>Loading event details...</p></div>;
  if (error || !eventItem) {
    return (
      <div style={pageStyle}>
        <Helmet><title>Event Not Found - School Name</title></Helmet>
        <h2>{error ? 'Error' : 'Event Not Found'}</h2>
        <p>{error || 'The event you are looking for does not exist.'}</p>
        <Link to="/events" style={backLinkStyle}>&larr; Back to All Events</Link>
      </div>
    );
  }

  const displayStartDate = eventItem.start_date ? new Date(eventItem.start_date).toLocaleString() : 'N/A';
  const displayEndDate = eventItem.end_date ? new Date(eventItem.end_date).toLocaleString() : null;
  const metaDescription = eventItem.description ? eventItem.description.substring(0, 160).replace(/<[^>]+>/g, '') + '...' : 'Find out more about this event at our school.';


  return (
    <div style={pageStyle}>
      <Helmet>
        <title>{`${eventItem.title} - School Events`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${eventItem.title} - School Events`} />
        <meta property="og:description" content={metaDescription} />
        {eventItem.image_url && <meta property="og:image" content={eventItem.image_url} />}
        <meta property="og:type" content="event" />
      </Helmet>
      <Link to="/events" style={backLinkStyle}>&larr; Back to All Events</Link>
      <h1>{eventItem.title}</h1>
      <div style={metadataStyle}>
        {eventItem.category && <span style={categoryStyle}>{eventItem.category}</span>}
        <span><strong>Date:</strong> {displayStartDate}</span>
        {displayEndDate && <span> - {displayEndDate}</span>}
        {eventItem.location && <span><strong>Location:</strong> {eventItem.location}</span>}
      </div>
      {eventItem.image_url && <img src={eventItem.image_url} alt={eventItem.title} style={imageStyle} onClick={() => openLightbox(eventItem.image_url)} />}
      {eventItem.video_url && !eventItem.image_url && ( /* ... existing video embed logic ... */
        <div style={videoPlaceholderStyle}>
          {eventItem.video_url.includes("youtube.com/embed") || eventItem.video_url.includes("youtu.be") ? (
            <iframe width="100%" height="100%" src={eventItem.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} title={eventItem.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{borderRadius: '8px'}}></iframe>
          ) : ( <><span style={playIconStyle}>&#9658;</span><span>Video Content (Link: <a href={eventItem.video_url} target="_blank" rel="noopener noreferrer" style={{color: 'white'}}>{eventItem.video_url}</a>)</span></> )}
        </div>
      )}
      <div className="content-body" style={{ lineHeight: '1.7', fontSize: '1.1rem' }} dangerouslySetInnerHTML={{ __html: eventItem.description || '' }}></div>
      <LightboxModal isOpen={isLightboxOpen} onClose={closeLightbox} imageUrl={lightboxImageUrl} altText={eventItem.title} />
    </div>
  );
};
export default EventDetailPage;
