import React, { useState, useEffect } from 'react';
import './RandomQuote.css';

function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote(data)) // set the entire data object to quote
      .catch(error => {
        setErrorMessage('Error fetching a random quote: ' + error.message);
      });
  }, []);

  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="random-quote-widget">
          <p className="quote">"{quote.content}"</p>
          <p className="author">- {quote.author}</p>
        </div>
      )}
    </div>
  );
}

export default RandomQuote;