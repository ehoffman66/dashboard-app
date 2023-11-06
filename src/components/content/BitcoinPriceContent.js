import React, { useState, useEffect } from 'react';
import './BitcoinPriceContent.css'; // Make sure this path is correct

const BitcoinPriceContent = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  // Function to fetch Bitcoin price
  const fetchBitcoinPrice = async () => {
    try {
      // Replace with the actual API endpoint you're using to fetch the Bitcoin price
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
      setBitcoinPrice(data.bpi.USD.rate_float); // Update state with the new price
    } catch (error) {
      console.error('Failed to fetch Bitcoin price:', error);
    }
  };

  useEffect(() => {
    fetchBitcoinPrice(); // Fetch price on component mount
    const intervalId = setInterval(fetchBitcoinPrice, 60000); // Fetch price every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  // Format the price as currency
  const formattedPrice = bitcoinPrice ? bitcoinPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...';

  return (
    <div className="bitcoin-price-content">
      <h3>Bitcoin Price</h3>
      <p>{formattedPrice}</p>
    </div>
  );
};

export default BitcoinPriceContent;
