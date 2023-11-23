import React, { useState, useEffect, useCallback } from 'react';
import DraggableCard from './DraggableCard';
import Navbar from './Navbar';
import './Dashboard.css';

const DEFAULT_CARDS = [
  { id: 1, title: 'NFL Scores', content: 'NFL', position: { x: -171, y: 0 }},
  { id: 2, title: 'Current Time', content: 'Clock', position: { x: -167, y: 0 }},
  { id: 3, title: 'Bitcoin Price', content: 'Bitcoin', position: { x: -128, y: 0 }},
  { id: 4, title: 'NHL Scores', content: 'NHL', position: { x: -35, y: -4 }},
  { id: 5, title: 'Bookmarks', content: 'Bookmark', position: { x: 24, y: -483 }},
  { id: 6, title: 'NBA Scores', content: 'NBA', position: { x: -307, y: -266 }},
  { id: 7, title: 'F1 Driver Standings', content: 'F1', position: { x: 641, y: 300 }},
  { id: 8, title: 'College Football Scores', content: 'College', position: { x: 641, y: 200 }},
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
        return { ...card, position: { x, y }};
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
      <Navbar widgets={DEFAULT_CARDS} /> {/* Pass DEFAULT_CARDS as widgets prop */}
      <div className="dashboard">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            index={index}
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