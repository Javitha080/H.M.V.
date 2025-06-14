import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { supabase } from '../supabaseClient';
import { Helmet } from 'react-helmet'; // Import Helmet

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');

  const actualDebounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const debounce = React.useRef(actualDebounce).current;


  const fetchEvents = useCallback(async (currentSearchTerm, currentCategory) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('events').select('*').order('start_date', { ascending: true });
      if (currentCategory !== 'All') query = query.eq('category', currentCategory);
      if (currentSearchTerm) query = query.or(`title.ilike.%${currentSearchTerm}%,description.ilike.%${currentSearchTerm}%`);
      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setEvents(data || []);
    } catch (e) {
      console.error('Error fetching events:', e);
      setError(e.message || 'Failed to fetch events.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchEvents = useCallback(debounce(fetchEvents, 500), [fetchEvents, debounce]);

  useEffect(() => { fetchEvents(searchTerm, selectedCategory); }, [selectedCategory, fetchEvents, searchTerm]); // Added searchTerm here
  useEffect(() => { debouncedFetchEvents(searchTerm, selectedCategory); }, [searchTerm, selectedCategory, debouncedFetchEvents]);

  useEffect(() => {
    const fetchInitialCategories = async () => {
      try {
        const { data, error } = await supabase.rpc('distinct_categories', { table_name: 'events' });
        if (error) throw error;
        const uniqueCategories = ['All', ...new Set((data || []).map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (catError) { console.error("Error fetching categories for events:", catError); }
    };
    fetchInitialCategories();
  }, []);

  useEffect(() => {
    const eventsSubscription = supabase
      .channel('public:events')
      .on('postgres_changes',
          { event: '*', schema: 'public', table: 'events' },
          (payload) => {
            console.log('Events change received!', payload);
            fetchEvents(searchTerm, selectedCategory); // Refetch with current filters
            // Refetch categories
             const fetchDynamicCategories = async () => {
                try {
                    const { data, error } = await supabase.rpc('distinct_categories', { table_name: 'events' });
                    if (error) throw error;
                    const uniqueCategories = ['All', ...new Set((data || []).map(item => item.category).filter(Boolean))];
                    setCategories(uniqueCategories);
                } catch (catError) { console.error("Error refetching categories:", catError); }
            };
            fetchDynamicCategories();
          }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') console.log('Subscribed to events changes!');
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error(`Subscription Error (Events): ${status}`, err);
          setError(`Real-time connection error for events (${status}). Please refresh.`);
        }
      });
    return () => { supabase.removeChannel(eventsSubscription); };
  }, [supabase, fetchEvents, searchTerm, selectedCategory]);


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
        <title>Upcoming Events - School Name</title>
        <meta name="description" content="Find out about upcoming events, workshops, and activities at Our School." />
        <meta property="og:title" content="Upcoming Events - School Name" />
        <meta property="og:description" content="Find out about upcoming events, workshops, and activities at Our School." />
      </Helmet>
      <h1>Upcoming Events</h1>
      <div style={controlsContainerStyle}>
        <input type="search" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={searchInputStyle}/>
        <div style={filterContainerStyle}>
          {categories.map(category => (
            <button key={category} onClick={() => setSelectedCategory(category)} style={filterButtonStyle(selectedCategory === category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found.</p>}
      {!loading && !error && events.length > 0 && (
        <div style={gridStyle}>
          {events.map(eventItem => (
            <Card key={eventItem.id} type="event" id={eventItem.slug || eventItem.id} title={eventItem.title}
              description={eventItem.description ? eventItem.description.substring(0,100)+'...' : ''}
              category={eventItem.category}
              date={eventItem.start_date ? new Date(eventItem.start_date).toLocaleString() : ''}
              imageUrl={eventItem.image_url} videoUrl={eventItem.video_url} linkTo={`/events/${eventItem.slug || eventItem.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default EventsPage;
