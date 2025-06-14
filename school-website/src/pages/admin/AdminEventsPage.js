import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true }); // Order by start date

        if (fetchError) throw fetchError;
        setEvents(data || []);
      } catch (e) {
        console.error('Error fetching events:', e);
        setError(e.message || 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId, title) => {
    if (window.confirm(`Are you sure you want to delete the event: "${title}"?`)) {
      try {
        setError(null);
        const { error: deleteError } = await supabase.from('events').delete().match({ id: eventId });
        if (deleteError) throw deleteError;

        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        alert('Event deleted successfully.');
      } catch (e) {
        console.error('Error deleting event:', e);
        setError(e.message || 'Failed to delete event.');
        alert(`Error: ${e.message || 'Failed to delete event.'}`);
      }
    }
  };

  // Reusing styles from AdminNewsPage for consistency
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' };
  const thTdStyle = { border: '1px solid var(--border-color)', padding: '0.5rem', textAlign: 'left' };
  const buttonStyle = { padding: '0.3rem 0.6rem', marginRight: '0.5rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg-color)', color: 'var(--text-color)' };
  const createButtonStyle = { padding: '0.7rem 1.2rem', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: 'var(--text-color)', color: 'var(--background-color)', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' };

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Manage Events</h2>
        <Link to="/admin/events/new" style={createButtonStyle}>Create New Event</Link>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {events.length === 0 && !loading && <p>No events found. Create one!</p>}

      {events.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Title</th>
              <th style={thTdStyle}>Category</th>
              <th style={thTdStyle}>Start Date</th>
              <th style={thTdStyle}>Location</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td style={thTdStyle}>{event.title}</td>
                <td style={thTdStyle}>{event.category || '-'}</td>
                <td style={thTdStyle}>{event.start_date ? new Date(event.start_date).toLocaleString() : '-'}</td>
                <td style={thTdStyle}>{event.location || '-'}</td>
                <td style={thTdStyle}>
                  <button onClick={() => navigate(`/admin/events/edit/${event.id}`)} style={buttonStyle}>Edit</button>
                  <button onClick={() => handleDelete(event.id, event.title)} style={{...buttonStyle, backgroundColor: '#ffdddd', color: '#d00'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEventsPage;
