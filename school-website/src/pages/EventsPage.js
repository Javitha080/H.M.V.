import React, { useState, useMemo } from 'react';
import Card from '../components/Card';

const sampleEventsData = [
  { id: 'event1', title: 'Annual Sports Day', description: 'Join us for a day of thrilling athletic competitions and fun.', category: 'Sports', date: '2023-12-05', imageUrl: 'https://via.placeholder.com/350x180/87CEEB/000000?text=Sports+Day' },
  { id: 'event2', title: 'Winter Charity Drive', description: 'Contribute to our annual charity drive to help those in need.', category: 'Community', date: '2023-12-10', imageUrl: 'https://via.placeholder.com/350x180/FA8072/000000?text=Charity+Drive' },
  { id: 'event3', title: 'Christmas Concert', description: 'Enjoy a festive evening with performances by our school choir and band.', category: 'Arts & Culture', date: '2023-12-20', videoUrl: 'placeholder_video_id' },
  { id: 'event4', title: 'Alumni Meet 2023', description: 'Reconnect with old friends and teachers at the annual alumni meet.', category: 'Alumni', date: '2023-12-28' },
  { id: 'event5', title: 'Coding Workshop for Beginners', description: 'Learn the basics of coding in this interactive workshop.', category: 'Academics', date: '2024-01-15', imageUrl: 'https://via.placeholder.com/350x180/98FB98/000000?text=Coding+Workshop' },
];

const eventCategories = ['All', ...new Set(sampleEventsData.map(item => item.category))];

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') {
      return sampleEventsData;
    }
    return sampleEventsData.filter(event => event.category === selectedCategory);
  }, [selectedCategory]);

  const pageStyle = {
    padding: '1rem 2rem',
    color: 'var(--text-color)'
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'flex-start',
    marginTop: '1rem',
  };

  const filterContainerStyle = {
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  };

  const filterButtonStyle = (isActive) => ({
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: isActive ? 'var(--text-color)' : 'var(--card-bg-color)',
    color: isActive ? 'var(--background-color)' : 'var(--text-color)',
    border: `1px solid ${isActive ? 'var(--text-color)' : 'var(--border-color)'}`,
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

  return (
    <div style={pageStyle}>
      <h1>Upcoming Events</h1>

      <div style={filterContainerStyle}>
        {eventCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={filterButtonStyle(selectedCategory === category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        <div style={gridStyle}>
          {filteredEvents.map(eventItem => (
            <Card
              key={eventItem.id}
              type="event" // Important for link generation
              id={eventItem.id}
              title={eventItem.title}
              description={eventItem.description}
              category={eventItem.category}
              date={eventItem.date}
              imageUrl={eventItem.imageUrl}
              videoUrl={eventItem.videoUrl}
            />
          ))}
        </div>
      ) : (
        <p>No events found for the selected category.</p>
      )}
      {/* Placeholder for pagination */}
    </div>
  );
};

export default EventsPage;
