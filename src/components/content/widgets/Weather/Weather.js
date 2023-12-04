import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const city = 'Baltimore';

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('url', url);
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
  }, []); // Removed city from dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  // Convert Celsius to Fahrenheit
  const fahrenheit = weather.main.temp * 9/5 + 32;

  return (
    <div className="weather-widget">
      <h2>Weather in {city}</h2>
      <p>{fahrenheit.toFixed(2)} °F</p>
      <p>{weather.weather[0].main}</p>
    </div>
  );
};

export default WeatherWidget;