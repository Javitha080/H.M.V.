import React, { useState, useMemo } from 'react';
import Card from '../components/Card';

const sampleNewsData = [
  { id: 'news1', title: 'School Annual Day: A Grand Success', description: 'Our annual day was celebrated with great enthusiasm, showcasing student talents.', category: 'Events', date: '2023-11-15', imageUrl: 'https://via.placeholder.com/350x180/FFD700/000000?text=Annual+Day' },
  { id: 'news2', title: 'Science Exhibition Winners', description: 'Students from Grade 10 won the inter-school science exhibition.', category: 'Academics', date: '2023-11-10', imageUrl: 'https://via.placeholder.com/350x180/ADD8E6/000000?text=Science+Fair' },
  { id: 'news3', title: 'Basketball Team Reaches Finals', description: 'Our school basketball team has made it to the city championship finals!', category: 'Sports', date: '2023-11-05', imageUrl: 'https://via.placeholder.com/350x180/90EE90/000000?text=Basketball' },
  { id: 'news4', title: 'New Library Wing Inaugurated', description: 'A new state-of-the-art library wing is now open for students.', category: 'Campus Life', date: '2023-10-28', videoUrl: 'placeholder_video_id' },
  { id: 'news5', title: 'Parent-Teacher Meeting Schedule', description: 'The upcoming parent-teacher meeting schedule for all grades has been announced.', category: 'Academics', date: '2023-11-20' },
  { id: 'news6', title: 'Art Competition Highlights', description: 'Students displayed incredible creativity at the annual art competition.', category: 'Events', date: '2023-10-22', imageUrl: 'https://via.placeholder.com/350x180/E6E6FA/000000?text=Art+Comp' },
];

const newsCategories = ['All', ...new Set(sampleNewsData.map(item => item.category))];

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'All') {
      return sampleNewsData;
    }
    return sampleNewsData.filter(news => news.category === selectedCategory);
  }, [selectedCategory]);

  const pageStyle = {
    padding: '1rem 2rem', // More padding for page container
    color: 'var(--text-color)'
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem', // Increased gap
    justifyContent: 'flex-start', // Align to start
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
      <h1>Latest News</h1>

      <div style={filterContainerStyle}>
        {newsCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={filterButtonStyle(selectedCategory === category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredNews.length > 0 ? (
        <div style={gridStyle}>
          {filteredNews.map(newsItem => (
            <Card
              key={newsItem.id}
              type="news"
              id={newsItem.id}
              title={newsItem.title}
              description={newsItem.description}
              category={newsItem.category}
              date={newsItem.date}
              imageUrl={newsItem.imageUrl}
              videoUrl={newsItem.videoUrl}
            />
          ))}
        </div>
      ) : (
        <p>No news items found for the selected category.</p>
      )}
      {/* Placeholder for pagination: <PaginationComponent totalItems={filteredNews.length} itemsPerPage={6} /> */}
    </div>
  );
};

export default NewsPage;
