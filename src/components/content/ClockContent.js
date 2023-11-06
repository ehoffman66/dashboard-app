import React, { useState, useEffect } from 'react';

const ClockContent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="clock-content">
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default ClockContent;
