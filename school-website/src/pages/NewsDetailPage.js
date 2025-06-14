import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LightboxModal from '../components/LightboxModal';
import { Helmet } from 'react-helmet'; // Import Helmet

const NewsDetailPage = () => {
  const { newsId: idOrSlug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!idOrSlug) { setError("News identifier not found in URL."); setLoading(false); return; }
      setLoading(true); setError(null);
      try {
        let query = supabase.from('news').select('*');
        if (idOrSlug.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
          query = query.eq('id', idOrSlug);
        } else {
          query = query.eq('slug', idOrSlug);
        }
        const { data, error: fetchError } = await query.single();
        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
        if (!data) { setError('News article not found.'); }
        else { setNewsItem(data); }
      } catch (e) { console.error('Error fetching news details:', e); setError(e.message || 'Failed to fetch news article.');
      } finally { setLoading(false); }
    }; // Defined fetchNewsItem
    fetchNewsItem(); // Call the async function
  }, [idOrSlug]);

  const openLightbox = (url) => { setLightboxImageUrl(url); setIsLightboxOpen(true); };
  const closeLightbox = () => { setIsLightboxOpen(false); setLightboxImageUrl(''); };

  const pageStyle = { /* ... */ }; const imageStyle = { /* ... */ };
  const videoPlaceholderStyle = { /* ... */ }; const playIconStyle = { /* ... */ };
  const metadataStyle = { /* ... */ }; const categoryStyle = { /* ... */ };
  const backLinkStyle = { /* ... */ };
  // Ensure styles are defined or imported if they were previously
  pageStyle.padding = '1rem 2rem'; pageStyle.color = 'var(--text-color)'; pageStyle.maxWidth = '900px'; pageStyle.margin = '0 auto';
  imageStyle.width = '100%'; imageStyle.maxHeight = '450px'; imageStyle.objectFit = 'cover'; imageStyle.borderRadius = '8px'; imageStyle.marginBottom = '1.5rem'; imageStyle.cursor = 'pointer';
  videoPlaceholderStyle.width = '100%'; videoPlaceholderStyle.height = '450px'; videoPlaceholderStyle.backgroundColor = '#333'; videoPlaceholderStyle.color = 'white'; videoPlaceholderStyle.display = 'flex'; videoPlaceholderStyle.flexDirection = 'column'; videoPlaceholderStyle.alignItems = 'center'; videoPlaceholderStyle.justifyContent = 'center'; videoPlaceholderStyle.borderRadius = '8px'; videoPlaceholderStyle.marginBottom = '1.5rem'; videoPlaceholderStyle.fontSize = '1.5rem';
  playIconStyle.fontSize = '3rem'; playIconStyle.marginBottom = '0.5rem';
  metadataStyle.display = 'flex'; metadataStyle.justifyContent = 'space-between'; metadataStyle.alignItems = 'center'; metadataStyle.fontSize = '0.9rem'; metadataStyle.opacity = 0.8; metadataStyle.marginBottom = '1rem'; metadataStyle.borderBottom = '1px solid var(--border-color)'; metadataStyle.paddingBottom = '0.5rem';
  categoryStyle.backgroundColor = 'var(--text-color)'; categoryStyle.color = 'var(--background-color)'; categoryStyle.padding = '0.25rem 0.75rem'; categoryStyle.borderRadius = '15px'; categoryStyle.fontSize = '0.8rem';
  backLinkStyle.display = 'inline-block'; backLinkStyle.margin = '2rem 0 1rem'; backLinkStyle.color = 'var(--text-color)'; backLinkStyle.textDecoration = 'underline';


  if (loading) return <div style={pageStyle}><p>Loading news article...</p></div>;
  if (error || !newsItem) {
    return (
      <div style={pageStyle}>
        <Helmet><title>News Not Found - School Name</title></Helmet>
        <h2>{error ? 'Error' : 'News Item Not Found'}</h2>
        <p>{error || 'The news article you are looking for does not exist.'}</p>
        <Link to="/news" style={backLinkStyle}>&larr; Back to All News</Link>
      </div>
    );
  }

  const displayDate = newsItem.published_date ? new Date(newsItem.published_date).toLocaleDateString() : (newsItem.created_at ? new Date(newsItem.created_at).toLocaleDateString() : 'N/A');
  const metaDescription = newsItem.excerpt || (newsItem.content ? newsItem.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...' : 'Read more about this news from our school.');


  return (
    <div style={pageStyle}>
      <Helmet>
        <title>{`${newsItem.title} - School News`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${newsItem.title} - School News`} />
        <meta property="og:description" content={metaDescription} />
        {newsItem.image_url && <meta property="og:image" content={newsItem.image_url} />}
        <meta property="og:type" content="article" />
        {/* <meta property="og:url" content={window.location.href} />  // Can cause issues with SSR if window is not defined */}
      </Helmet>
      <Link to="/news" style={backLinkStyle}>&larr; Back to All News</Link>
      <h1>{newsItem.title}</h1>
      <div style={metadataStyle}>
        <span>Published on: {displayDate}</span>
        {newsItem.category && <span style={categoryStyle}>{newsItem.category}</span>}
      </div>
      {newsItem.image_url && <img src={newsItem.image_url} alt={newsItem.title} style={imageStyle} onClick={() => openLightbox(newsItem.image_url)} />}
      {newsItem.video_url && !newsItem.image_url && ( /* ... existing video embed logic ... */
         <div style={videoPlaceholderStyle}>
          {newsItem.video_url.includes("youtube.com/embed") || newsItem.video_url.includes("youtu.be") ? (
            <iframe width="100%" height="100%" src={newsItem.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} title={newsItem.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{borderRadius: '8px'}}></iframe>
          ) : ( <><span style={playIconStyle}>&#9658;</span><span>Video Content (Link: <a href={newsItem.video_url} target="_blank" rel="noopener noreferrer" style={{color: 'white'}}>{newsItem.video_url}</a>)</span></> )}
        </div>
      )}
      <div className="content-body" style={{ lineHeight: '1.7', fontSize: '1.1rem' }} dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}></div>
      <LightboxModal isOpen={isLightboxOpen} onClose={closeLightbox} imageUrl={lightboxImageUrl} altText={newsItem.title} />
    </div>
  );
};
export default NewsDetailPage;
