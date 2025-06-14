import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { supabase } from '../supabaseClient';
import { Helmet } from 'react-helmet'; // Import Helmet

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchNews = useCallback(async (currentSearchTerm, currentCategory) => {
    // console.log('Fetching news with:', currentSearchTerm, currentCategory);
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false });

      if (currentCategory !== 'All') {
        query = query.eq('category', currentCategory);
      }
      if (currentSearchTerm) {
        query = query.or(`title.ilike.%${currentSearchTerm}%,content.ilike.%${currentSearchTerm}%,excerpt.ilike.%${currentSearchTerm}%`);
      }
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setNewsArticles(data || []);
    } catch (e) {
      console.error('Error fetching news:', e);
      setError(e.message || 'Failed to fetch news articles.');
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  }, []); // Removed categories.length from dependencies as it's handled separately

  const debouncedFetchNews = useCallback(debounce(fetchNews, 500), [fetchNews]);

  useEffect(() => {
    fetchNews(searchTerm, selectedCategory);
  }, [selectedCategory, fetchNews]); // fetchNews dependency is stable due to useCallback

  useEffect(() => {
    debouncedFetchNews(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory, debouncedFetchNews]);

  // Fetch initial categories
  useEffect(() => {
    const fetchInitialCategories = async () => {
      try {
        // Fetch distinct categories. This might be slow on very large tables without an index on category.
        // A separate 'categories' table or a Supabase function could optimize this.
        const { data, error } = await supabase.rpc('distinct_categories', { table_name: 'news' });

        if (error) throw error;
        const uniqueCategories = ['All', ...new Set((data || []).map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (catError) {
        console.error("Error fetching categories:", catError);
        // Fallback or keep existing categories if RPC fails
      }
    };

    fetchInitialCategories();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const newsSubscription = supabase
      .channel('public:news') // Unique channel name
      .on('postgres_changes',
          { event: '*', schema: 'public', table: 'news' },
          (payload) => {
            console.log('News change received!', payload);
            // Simple approach: refetch news with current filters
            // This ensures consistency with current search/filter state
            fetchNews(searchTerm, selectedCategory);

            // Also refetch categories in case a new one was added or an old one removed
            // This can be optimized further to only refetch categories if a category field changed
             const fetchDynamicCategories = async () => {
                try {
                    const { data, error } = await supabase.rpc('distinct_categories', { table_name: 'news' });
                    if (error) throw error;
                    const uniqueCategories = ['All', ...new Set((data || []).map(item => item.category).filter(Boolean))];
                    setCategories(uniqueCategories);
                } catch (catError) { console.error("Error refetching categories:", catError); }
            };
            fetchDynamicCategories();
          }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to news changes!');
        }
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error(`Subscription Error: ${status}`, err);
          setError(`Real-time connection error (${status}). Please refresh.`);
        }
      });

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(newsSubscription);
    };
  }, [supabase, fetchNews, searchTerm, selectedCategory]); // Include dependencies that fetchNews relies on for its context


  const pageStyle = { padding: '1rem 2rem', color: 'var(--text-color)' };
  const controlsContainerStyle = { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' };
  const searchInputStyle = { padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '250px' };
  const filterContainerStyle = { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' };
  let filterButtonStyle = (isActive) => ({ /* ... same style ... */ });
  filterButtonStyle.toString = () => 'filterButtonStyle'; // For logging if needed
  const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'flex-start', marginTop: '1rem' };

  filterButtonStyle = (isActive) => ({
    padding: '0.5rem 1rem', cursor: 'pointer',
    backgroundColor: isActive ? 'var(--text-color)' : 'var(--card-bg-color)',
    color: isActive ? 'var(--background-color)' : 'var(--text-color)',
    border: `1px solid ${isActive ? 'var(--text-color)' : 'var(--border-color)'}`,
    borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease',
  });


  return (
    <div style={pageStyle}>
      <Helmet>
        <title>Latest News - School Name</title>
        <meta name="description" content="Stay updated with the latest news and announcements from Our School." />
        <meta property="og:title" content="Latest News - School Name" />
        <meta property="og:description" content="Stay updated with the latest news and announcements from Our School." />
      </Helmet>
      <h1>Latest News</h1>
      <div style={controlsContainerStyle}>
        <input type="search" placeholder="Search news..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={searchInputStyle}/>
        <div style={filterContainerStyle}>
          {categories.map(category => (
            <button key={category} onClick={() => setSelectedCategory(category)} style={filterButtonStyle(selectedCategory === category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
      {loading && <p>Loading news articles...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && newsArticles.length === 0 && <p>No news items found.</p>}
      {!loading && !error && newsArticles.length > 0 && (
        <div style={gridStyle}>
          {newsArticles.map(newsItem => (
            <Card key={newsItem.id} type="news" id={newsItem.slug || newsItem.id} title={newsItem.title}
              description={newsItem.excerpt || (newsItem.content ? newsItem.content.substring(0,100)+'...' : '')}
              category={newsItem.category}
              date={newsItem.published_date ? new Date(newsItem.published_date).toLocaleDateString() : (newsItem.created_at ? new Date(newsItem.created_at).toLocaleDateString() : '')}
              imageUrl={newsItem.image_url} videoUrl={newsItem.video_url} linkTo={`/news/${newsItem.slug || newsItem.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default NewsPage;
