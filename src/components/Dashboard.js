import React, { useState, useEffect, useCallback } from 'react';
import DraggableCard from './DraggableCard';
import Navbar from './Navbar';
import './Dashboard.css';

const DEFAULT_CARDS = [
  { id: 1, title: 'NFL Scores', content: 'NFL', position: { x: 100, y: 100 }},
  { id: 2, title: 'Current Time', content: 'Clock', position: { x: 200, y: 200 }},
  { id: 3, title: 'Bitcoin Price', content: 'Bitcoin', position: { x: 300, y: 300 }},
  { id: 4, title: 'NHL Scores', content: 'NHL', position: { x: 400, y: 400 }},
  { id: 5, title: 'Bookmarks', content: 'Bookmark', position: { x: 500, y: 500 }},
  { id: 6, title: 'NBA Scores', content: 'NBA', position: { x: 600, y: 600 }},
  { id: 7, title: 'F1 Driver Standings', content: 'F1', position: { x: 700, y: 700 }},
  { id: 8, title: 'College Football Scores', content: 'College', position: { x: 800, y: 800 }},
  { id: 9, title: 'NASA Daily Photo', content: 'NASA', position: { x: 900, y: 900 }},
  { id: 10, title: 'Birthday Reminders', content: 'Birthday', position: { x: 1000, y: 1000 }},
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