import React, { useState, useEffect } from 'react';

const OfficeQuotes = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
  
    fetch('https://officeapi.akashrajpurohit.com/quote/random')
      .then(response => {
        console.log('Received response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setQuote(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {quote ? (
        <>
          <h2>{quote.character}</h2>
          <p>{quote.quote}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfficeQuotes;