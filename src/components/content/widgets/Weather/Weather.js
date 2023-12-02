import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const city = 'Baltmore';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data.');
        setLoading(false);
      });
  }, [city]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="weather-widget">
      <h2>Weather in {city}</h2>
      <p>{weather.main.temp} °C</p>
      <p>{weather.weather[0].main}</p>
    </div>
  );
};

export default WeatherWidget;