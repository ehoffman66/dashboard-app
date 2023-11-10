import React, { useState, useEffect } from 'react';
import './ClockContent.css'; // Ensure you have this CSS file

const ClockContent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    function tick() {
      setTime(new Date());
    }

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="clock-container">
      <div className="clock-time">{time.toLocaleTimeString()}</div>
      <div className="clock-date">{time.toDateString()}</div>
    </div>
  );
};

export default ClockContent;
