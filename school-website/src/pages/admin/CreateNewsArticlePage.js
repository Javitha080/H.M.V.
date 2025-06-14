import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreateNewsArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [slug, setSlug] = useState(''); // Optional, can be auto-generated

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-\-+/g, '-')    // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // Auto-generate slug from title, user can override
    if (!slug || slug === generateSlug(title)) { // only if slug is empty or was previously auto-generated from old title
        setSlug(generateSlug(e.target.value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    // Basic validation
    if (!title || !content) {
        setError("Title and Content are required.");
        setLoading(false);
        return;
    }

    const newsData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + (content.length > 150 ? '...' : ''), // Auto-generate excerpt
      category: category || null,
      published_date: publishedDate || null,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      slug: slug || generateSlug(title), // Ensure slug is set
      // created_at is set by default in Supabase
    };

    try {
      const { data, error: insertError } = await supabase.from('news').insert([newsData]).select();
      if (insertError) throw insertError;

      setSuccessMessage(`News article "${data[0].title}" created successfully!`);
      // Optionally reset form or redirect
      // resetForm();
      setTimeout(() => navigate('/admin/news'), 1500); // Redirect after a short delay
    } catch (e) {
      console.error('Error creating news article:', e);
      setError(e.message || 'Failed to create news article.');
    } finally {
      setLoading(false);
    }
  };

  // Styles (can be moved to CSS files)
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px', margin: '0 auto' };
  const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
  const labelStyle = { marginBottom: '0.3rem', fontWeight: 'bold' };
  const inputStyle = { padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-color)', color: 'var(--text-color)'};
  const textareaStyle = { ...inputStyle, minHeight: '150px', fontFamily: 'inherit' };
  const buttonStyle = { padding: '0.8rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: 'var(--text-color)', color: 'var(--background-color)', cursor: 'pointer', fontSize: '1rem' };


  return (
    <div>
      <h2>Create New News Article</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
          <label htmlFor="excerpt" style={labelStyle}>Excerpt (auto-generated if empty):</label>
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
          <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} placeholder="https://example.com/image.jpg" />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="videoUrl" style={labelStyle}>Video URL (e.g., YouTube embed link):</label>
          <input type="url" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={inputStyle} placeholder="https://youtube.com/embed/video_id" />
        </div>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Creating...' : 'Create News Article'}
        </button>
      </form>
    </div>
  );
};

export default CreateNewsArticlePage;
