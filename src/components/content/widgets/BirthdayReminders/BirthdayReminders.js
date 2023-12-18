import React, { useState, useEffect } from 'react';
import './BirthdayReminders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const BirthdayWidget = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthday, setNewBirthday] = useState({ name: '', month: '', day: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const editBirthday = (index) => {
    setNewBirthday(birthdays[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  const updateBirthday = () => {
    const updatedBirthdays = [...birthdays];
    updatedBirthdays[editIndex] = newBirthday;
    setBirthdays(sortBirthdays(updatedBirthdays));
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
    setNewBirthday({ name: '', month: '', day: '' });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setNewBirthday({ name: '', month: '', day: '' });
    setIsEditing(false);
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
          className="month"
        />
        <input 
          type="text" 
          name="day" 
          value={newBirthday.day} 
          onChange={handleInputChange} 
          placeholder="Day" 
          maxLength="2"
          className="day"
        />
        {isEditing ? (
          <div>
            <button className="update" onClick={updateBirthday}>Update</button>            
            <button onClick={cancelEdit}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
        ) : (
          <button onClick={addBirthday}>Add</button>
        )}
      </div>
      <ul>
        {birthdays.map((birthday, index) => (
          <li key={index}>
            <span role="img" aria-label="birthday cake" className="birthday-icon">🎂</span> 
            <span className="birthday-name">{birthday.name}</span> -  
            <span className="birthday-date"> {birthday.month}/{birthday.day}</span>
            <div className="button-container">
              <button onClick={() => deleteBirthday(index)}><FontAwesomeIcon icon={faTrash} /></button>
              <button onClick={() => editBirthday(index)}><FontAwesomeIcon icon={faPencilAlt} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayWidget;