import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomQuote.css';

const RandomQuoteWidget = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/quotes/random');
        setQuote(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching a random quote:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomQuote();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="random-quote-widget">
        <p className="quote">"{quote.content}"</p>
        <p className="author">- {quote.author}</p>
    </div>
  );
};

export default RandomQuoteWidget;
