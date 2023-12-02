import React, { useState, useEffect } from 'react';
import './OfficeQuotes.css'; // Import the CSS file

const OfficeQuotes = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch('https://officeapi.akashrajpurohit.com/quote/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="office-quotes-widget">
    {quote ? (
        <>
        <div
            className="character-avatar"
            style={{ backgroundImage: `url(${quote.character_avatar_url})` }}
        />
        <div>
            <h2 className="character">{quote.character}</h2>
            <p className="quote">{quote.quote}</p>
        </div>
        </>
    ) : (
        <p>Loading...</p>
    )}
    </div>
  );
};

export default OfficeQuotes;