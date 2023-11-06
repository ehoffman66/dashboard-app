import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BitcoinPriceContent.css';

const BitcoinPriceContent = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiEndpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';

    axios.get(apiEndpoint)
      .then(response => {
        console.log(response)
        setBitcoinPrice(response.data.bpi.USD.rate);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Bitcoin data:', error);
        setError('Failed to load Bitcoin price.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Bitcoin price...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bitcoin-price-content">
      <p>{`$${bitcoinPrice}`}</p>
    </div>
  );
};

export default BitcoinPriceContent;
