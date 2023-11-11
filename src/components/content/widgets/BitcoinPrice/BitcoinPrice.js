import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BitcoinPrice.css'; // Make sure the path to your CSS file is correct

const BitcoinPriceContent = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setBitcoinData(response.data.bpi.USD.rate_float);
        setLoading(false);
      } catch (error) {
        setError('Failed to load Bitcoin price.');
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
    const intervalId = setInterval(fetchBitcoinPrice, 60000); // Fetch price every minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const formattedPrice = bitcoinData
    ? bitcoinData.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    : '';

  return (
    <div className="bitcoin-price-card">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="bitcoin-price-content">
          <img src="/images/bitcoin-logo.png" alt="Bitcoin" className="bitcoin-image" />
          <p className="bitcoin-price-value">{formattedPrice}</p>
        </div>
      )}
      <p className="bitcoin-price-footer">Updated every minute</p>
    </div>
  );
};

export default BitcoinPriceContent;
