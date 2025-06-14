import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

const EditNewsArticlePage = () => {
  const { newsId } = useParams(); // Get newsId from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [slug, setSlug] = useState('');

  const [initialSlug, setInitialSlug] = useState(''); // To help with auto-slug generation logic

  const [loading, setLoading] = useState(true); // Start true for initial data fetch
  const [formLoading, setFormLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    const fetchNewsArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .eq('id', newsId)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('News article not found.');

        setTitle(data.title || '');
        setContent(data.content || '');
        setExcerpt(data.excerpt || '');
        setCategory(data.category || '');
        // Format date for input type="date" which expects YYYY-MM-DD
        setPublishedDate(data.published_date ? new Date(data.published_date).toISOString().split('T')[0] : '');
        setImageUrl(data.image_url || '');
        setVideoUrl(data.video_url || '');
        setSlug(data.slug || '');
        setInitialSlug(data.slug || ''); // Store initial slug

      } catch (e) {
        console.error('Error fetching news article:', e);
        setError(e.message || 'Failed to fetch news article data.');
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsArticle();
    } else {
      setError('No News ID provided.');
      setLoading(false);
    }
  }, [newsId]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto-generate slug only if the current slug was auto-generated from the *initial* title or is empty
    if (slug === generateSlug(title) || slug === initialSlug || !slug) {
        setSlug(generateSlug(newTitle));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccessMessage('');

    if (!title || !content) {
        setError("Title and Content are required.");
        setFormLoading(false);
        return;
    }

    const updatedNewsData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + (content.length > 150 ? '...' : ''),
      category: category || null,
      published_date: publishedDate || null,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      slug: slug || generateSlug(title),
      // updated_at can be auto-updated by Supabase trigger or here if needed
    };

    try {
      const { data, error: updateError } = await supabase
        .from('news')
        .update(updatedNewsData)
        .eq('id', newsId)
        .select();

      if (updateError) throw updateError;

      setSuccessMessage(`News article "${data[0].title}" updated successfully!`);
      setInitialSlug(data[0].slug); // Update initial slug in case of further edits
      setTimeout(() => navigate('/admin/news'), 1500);
    } catch (e) {
      console.error('Error updating news article:', e);
      setError(e.message || 'Failed to update news article.');
    } finally {
      setFormLoading(false);
    }
  };

  // Styles (re-use from CreateNews form or centralize later)
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px', margin: '0 auto' };
  const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
  const labelStyle = { marginBottom: '0.3rem', fontWeight: 'bold' };
  const inputStyle = { padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)', color: 'var(--text-color)'};
  const textareaStyle = { ...inputStyle, minHeight: '150px', fontFamily: 'inherit' };
  const buttonStyle = { padding: '0.8rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--text-color)', color: 'var(--background-color)', cursor: 'pointer', fontSize: '1rem' };

  if (loading) return <p>Loading article data...</p>;
  // Error display for initial fetch
  if (error && !successMessage) return <p style={{ color: 'red' }}>Error: {error}</p>;


  return (
    <div>
      <h2>Edit News Article</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* For form submission errors */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="title" style={labelStyle}>Title*:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required style={inputStyle} />
        </div>
         <div style={inputGroupStyle}>
          <label htmlFor="slug" style={labelStyle}>Slug (auto-generated, editable):</label>
          <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="content" style={labelStyle}>Content*:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required style={textareaStyle}></textarea>
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="excerpt" style={labelStyle}>Excerpt:</label>
          <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{...textareaStyle, minHeight: '80px'}}></textarea>
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="publishedDate" style={labelStyle}>Published Date:</label>
          <input type="date" id="publishedDate" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="imageUrl" style={labelStyle}>Image URL:</label>
          <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="videoUrl" style={labelStyle}>Video URL:</label>
          <input type="url" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={inputStyle} />
        </div>
        <button type="submit" disabled={formLoading} style={buttonStyle}>
          {formLoading ? 'Updating...' : 'Update News Article'}
        </button>
      </form>
    </div>
  );
};

export default EditNewsArticlePage;
