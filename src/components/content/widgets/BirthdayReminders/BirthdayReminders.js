import React, { useState, useEffect } from 'react';
import './BirthdayReminders.css';

const BirthdayWidget = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', month: '', day: '' });

  useEffect(() => {
    const loadedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    setBirthdays(loadedBirthdays);
  }, []);

  const addBirthday = () => {
    const updatedBirthdays = [...birthdays, newBirthday];
    setBirthdays(updatedBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
    setNewBirthday({ name: '', month: '', day: '' });
  };

  const deleteBirthday = (index) => {
    const updatedBirthdays = birthdays.filter((_, i) => i !== index);
    setBirthdays(updatedBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
  };

  const handleInputChange = (e) => {
    setNewBirthday({ ...newBirthday, [e.target.name]: e.target.value });
  };

  return (
    <div className="birthday-widget">
      <div>
        <input 
          type="text" 
          name="name" 
          value={newBirthday.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          name="month" 
          value={newBirthday.month} 
          onChange={handleInputChange} 
          placeholder="Month" 
          maxLength="2"
        />
        <input 
          type="text" 
          name="day" 
          value={newBirthday.day} 
          onChange={handleInputChange} 
          placeholder="Day" 
          maxLength="2"
        />
        <button onClick={addBirthday}>Add</button>
      </div>
      <div className="birthday-list">
        {birthdays.map((birthday, index) => (
          <div key={index} className="birthday">
            {birthday.name} - {birthday.month}/{birthday.day}
            <button onClick={() => deleteBirthday(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayWidget;