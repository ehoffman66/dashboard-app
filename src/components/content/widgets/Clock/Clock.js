import React, { useState, useEffect } from 'react';
import './Clock.css'; 

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

  const timeZone = time.toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop();

  return (
    <div className="clock-container">
      <div className="clock-time">{time.toLocaleTimeString()}</div>
      <div className="clock-date">{time.toDateString()}</div>
      <div className="clock-timezone">{timeZone}</div>
    </div>
  );
};

export default ClockContent;
