import React, { useState, useEffect } from 'react';

const BirthdayWidget = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', date: '' });

  useEffect(() => {
    // Load birthdays from local storage
    const loadedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    setBirthdays(loadedBirthdays);
  }, []);

  const addBirthday = () => {
    const updatedBirthdays = [...birthdays, newBirthday];
    setBirthdays(updatedBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
    setNewBirthday({ name: '', date: '' }); // Reset input fields
  };

  const handleInputChange = (e) => {
    setNewBirthday({ ...newBirthday, [e.target.name]: e.target.value });
  };

  return (
    <div className="birthday-widget">
      <h2>Birthdays</h2>
      <div>
        {birthdays.map((birthday, index) => (
          <div key={index}>{birthday.name} - {birthday.date}</div>
        ))}
      </div>
      <div>
        <input 
          type="text" 
          name="name" 
          value={newBirthday.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
        />
        <input 
          type="date" 
          name="date" 
          value={newBirthday.date} 
          onChange={handleInputChange} 
        />
        <button onClick={addBirthday}>Add Birthday</button>
      </div>
    </div>
  );
};

export default BirthdayWidget;
