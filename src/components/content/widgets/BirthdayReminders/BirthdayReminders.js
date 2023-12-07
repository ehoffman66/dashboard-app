import React, { useState, useEffect } from 'react';
import './BirthdayReminders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BirthdayWidget = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', month: '', day: '' });

  useEffect(() => {
    const loadedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    setBirthdays(sortBirthdays(loadedBirthdays));
  }, []);

  const addBirthday = () => {
    const updatedBirthdays = sortBirthdays([...birthdays, newBirthday]);
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

  const sortBirthdays = (birthdays) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() is zero-based
    const currentDay = today.getDate();

    return birthdays.sort((a, b) => {
      const aMonth = parseInt(a.month);
      const bMonth = parseInt(b.month);
      const aDay = parseInt(a.day);
      const bDay = parseInt(b.day);

      if (aMonth === bMonth) {
        if (aDay === bDay) return 0;
        return (aDay < bDay) ? -1 : 1;
      }

      if (aMonth < currentMonth || (aMonth === currentMonth && aDay < currentDay)) {
        return 1;
      }

      if (bMonth < currentMonth || (bMonth === currentMonth && bDay < currentDay)) {
        return -1;
      }

      return (aMonth < bMonth) ? -1 : 1;
    });
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
            <FontAwesomeIcon 
              className="delete-icon"
              icon={faTrash} 
              onClick={() => deleteBirthday(index)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayWidget;