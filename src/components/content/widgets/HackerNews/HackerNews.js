import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HackerNews.css';

const HackerNewsWidget = () => {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStoriesIds = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const topTenIds = topStoriesIds.data.slice(0, 10);

        const storiesPromises = topTenIds.map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        );

        const stories = await Promise.all(storiesPromises);
        setTopStories(stories.map(story => story.data));
      } catch (error) {
        console.error('Error fetching top stories from Hacker News:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="hacker-news-widget">
      <h2>Top Hacker News Stories</h2>
      <ul>
        {topStories.map((story, index) => (
          <li key={index}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HackerNewsWidget;
