import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/AuthContext'; // To ensure user is admin if roles were implemented

const AdminNewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const { isUserAdmin } = useAuth(); // Example if we had role checking

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ensure RLS policies allow authenticated users (or specific admin role) to read
        const { data, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setNewsArticles(data || []);
      } catch (e) {
        console.error('Error fetching news:', e);
        setError(e.message || 'Failed to fetch news articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (newsId, title) => {
    if (window.confirm(`Are you sure you want to delete the news article: "${title}"?`)) {
      try {
        setError(null); // Clear previous errors
        const { error: deleteError } = await supabase.from('news').delete().match({ id: newsId });
        if (deleteError) throw deleteError;

        setNewsArticles(prevArticles => prevArticles.filter(article => article.id !== newsId));
        alert('News article deleted successfully.');
      } catch (e) {
        console.error('Error deleting news:', e);
        setError(e.message || 'Failed to delete news article.');
        alert(`Error: ${e.message || 'Failed to delete news article.'}`);
      }
    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };
  const thTdStyle = {
    border: '1px solid var(--border-color)',
    padding: '0.5rem',
    textAlign: 'left',
  };
  const buttonStyle = {
    padding: '0.3rem 0.6rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--text-color)',
  };
   const createButtonStyle = {
    padding: '0.7rem 1.2rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    textDecoration: 'none', // For Link component
    display: 'inline-block',
    marginBottom: '1rem',
  };


  if (loading) return <p>Loading news articles...</p>;
  // if (error) return <p style={{ color: 'red' }}>Error loading news: {error}</p>; // Show error below

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Manage News Articles</h2>
        <Link to="/admin/news/new" style={createButtonStyle}>Create New News</Link>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {newsArticles.length === 0 && !loading && <p>No news articles found. Create one!</p>}

      {newsArticles.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Title</th>
              <th style={thTdStyle}>Category</th>
              <th style={thTdStyle}>Published Date</th>
              <th style={thTdStyle}>Created At</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsArticles.map(article => (
              <tr key={article.id}>
                <td style={thTdStyle}>{article.title}</td>
                <td style={thTdStyle}>{article.category || '-'}</td>
                <td style={thTdStyle}>{article.published_date ? new Date(article.published_date).toLocaleDateString() : '-'}</td>
                <td style={thTdStyle}>{new Date(article.created_at).toLocaleString()}</td>
                <td style={thTdStyle}>
                  <button onClick={() => navigate(`/admin/news/edit/${article.id}`)} style={buttonStyle}>Edit</button>
                  <button onClick={() => handleDelete(article.id, article.title)} style={{...buttonStyle, backgroundColor: '#ffdddd', color: '#d00'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNewsPage;
