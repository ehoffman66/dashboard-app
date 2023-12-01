import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfficeQuotesWidget.css'; // Make sure to include your stylesheet

const OfficeQuotesWidget = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://officeapi.akashrajpurohit.com/quote/random');
        setQuoteData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching The Office quote:', err);
        setError('Failed to load quote.');
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quoteData) return null;

  return (
    <div className="office-quotes-widget">
      <img src={quoteData.character_avatar_url} alt={quoteData.character} className="character-avatar" />
      <p className="quote">{quoteData.quote}</p>
      <p className="character">- {quoteData.character}</p>
    </div>
  );
};

export default OfficeQuotesWidget;
