import React, { useState, useEffect, useCallback } from 'react';
import DraggableCard from './DraggableCard';
import Navbar from './Navbar';
import './Dashboard.css';

const DEFAULT_CARDS = [
  { id: 1, title: 'NFL Scores', content: 'NFL', position: { x: -184, y: -32 }},
  { id: 2, title: 'Current Time', content: 'Clock', position: { x: -175, y: -27 }},
  { id: 3, title: 'Bitcoin Price', content: 'Bitcoin', position: { x: -506, y: 174 }},
  { id: 4, title: 'NHL Scores', content: 'NHL', position: { x: 981, y: -715 }},
  { id: 5, title: 'Bookmarks', content: 'Bookmark', position: { x: 7, y: -259 }},
  { id: 6, title: 'NBA Scores', content: 'NBA', position: { x: -19, y: -27 }},
  { id: 7, title: 'F1 Driver Standings', content: 'F1', position: { x: 28, y: -669 }},
  { id: 8, title: 'College Football Scores', content: 'College', position: { x: -291, y: 62 }},
  { id: 9, title: 'NASA Daily Photo', content: 'NASA', position: { x: -624, y: -477 }},
  { id: 10, title: 'Birthday Reminders', content: 'Birthday', position: { x: -117, y: -1409 }},
  { id: 11, title: 'Office Quotes', content: 'Office', position: { x: -117, y: -1409 }},
  { id: 12, title: 'Weather', content: 'Weather', position: { x: -117, y: -1409 }},
  { id: 13, title: 'Hacker News', content: 'HackerNews', position: { x: -117, y: -1500 }},
];

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('dashboardCards'));
    if (savedCards) {
      setCards(savedCards);
    } else {
      setCards(DEFAULT_CARDS);
      localStorage.setItem('dashboardCards', JSON.stringify(DEFAULT_CARDS));
    }
  }, []);

  const onControlledDrag = useCallback((id, x, y) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, position: { x: x, y: y }};
      }
      return card;
    });
    setCards(newCards);
    localStorage.setItem('dashboardCards', JSON.stringify(newCards));
  }, [cards]);

  const onClose = (id) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
    localStorage.setItem('dashboardCards', JSON.stringify(newCards));
  };

  return (
    <div>
      <Navbar widgets={cards} />
      <div className="dashboard">
        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            position={card.position}
            onControlledDrag={onControlledDrag}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
};    
export default Dashboard;