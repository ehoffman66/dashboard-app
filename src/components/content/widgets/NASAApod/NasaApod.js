import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NASAApod.css'; 

const NasaApodWidget = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setApod(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching NASA APOD:', err);
        setError('Failed to load the Astronomy Picture of the Day.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apod) return null;

  return (
    <div className="nasa-apod-widget">
      <img src={apod.url} alt={apod.title} className="apod-image" />
      <div className="apod-title">{apod.title}</div>
    </div>
  );
};

export default NasaApodWidget;