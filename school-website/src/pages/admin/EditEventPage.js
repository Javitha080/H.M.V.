import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [initialSlug, setInitialSlug] = useState('');


  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const generateSlug = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase.from('events').select('*').eq('id', eventId).single();
        if (fetchError) throw fetchError;
        if (!data) throw new Error('Event not found.');

        setTitle(data.title || '');
        setDescription(data.description || '');
        setCategory(data.category || '');
        // Format datetime-local which expects YYYY-MM-DDTHH:mm
        const formatDateTimeLocal = (isoString) => isoString ? isoString.substring(0, 16) : '';
        setStartDate(formatDateTimeLocal(data.start_date));
        setEndDate(formatDateTimeLocal(data.end_date));
        setLocation(data.location || '');
        setImageUrl(data.image_url || '');
        setVideoUrl(data.video_url || '');
        setSlug(data.slug || '');
        setInitialSlug(data.slug || '');

      } catch (e) {
        console.error('Error fetching event:', e);
        setError(e.message || 'Failed to fetch event data.');
      } finally {
        setLoading(false);
      }
    };
    if (eventId) fetchEvent();
    else { setError('No Event ID provided.'); setLoading(false); }
  }, [eventId]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (slug === generateSlug(title) || slug === initialSlug || !slug) {
        setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!title || !description || !startDate) {
        setError("Title, Description, and Start Date are required.");
        setFormLoading(false);
        return;
    }

    const updatedEventData = {
      title,
      description,
      category: category || null,
      start_date: startDate || null,
      end_date: endDate || null,
      location: location || null,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      slug: slug || generateSlug(title),
    };

    try {
      const { data, error: updateError } = await supabase.from('events').update(updatedEventData).eq('id', eventId).select();
      if (updateError) throw updateError;

      setSuccessMessage(`Event "${data[0].title}" updated successfully!`);
      setInitialSlug(data[0].slug);
      setTimeout(() => navigate('/admin/events'), 1500);
    } catch (e) {
      console.error('Error updating event:', e);
      setError(e.message || 'Failed to update event.');
    } finally {
      setFormLoading(false);
    }
  };

  // Reusing styles
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px', margin: '0 auto' };
  const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
  const labelStyle = { marginBottom: '0.3rem', fontWeight: 'bold' };
  const inputStyle = { padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)', color: 'var(--text-color)'};
  const textareaStyle = { ...inputStyle, minHeight: '100px', fontFamily: 'inherit' };
  const buttonStyle = { padding: '0.8rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--text-color)', color: 'var(--background-color)', cursor: 'pointer', fontSize: '1rem' };


  if (loading) return <p>Loading event data...</p>;
  if (error && !successMessage) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Edit Event</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}><label style={labelStyle}>Title*:</label><input type="text" value={title} onChange={handleTitleChange} required style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Slug:</label><input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Description*:</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={textareaStyle}></textarea></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Category:</label><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Start Date/Time*:</label><input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>End Date/Time:</label><input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Location:</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Image URL:</label><input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} /></div>
        <div style={inputGroupStyle}><label style={labelStyle}>Video URL:</label><input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={inputStyle} /></div>
        <button type="submit" disabled={formLoading} style={buttonStyle}>{formLoading ? 'Updating...' : 'Update Event'}</button>
      </form>
    </div>
  );
};

export default EditEventPage;
