import React, { useState, useEffect } from 'react';
import DraggableCard from './DraggableCard';
import './Dashboard.css';

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Load the card positions from localStorage on initial render
    const savedCards = JSON.parse(localStorage.getItem('dashboardCards'));
    if (savedCards) {
      setCards(savedCards);
    } else {
      // Initialize with default positions if not present in localStorage
      const defaultCards = [
        { id: 1, title: 'NFL Scores', content: 'NFL', position: { x: 0, y: 0 }},
        { id: 2, title: 'Current Time', content: 'Clock', position: { x: 100, y: 0 }},
        { id: 3, title: 'Bitcoin Price', content: 'Bitcoin', position: { x: 200, y: 0 }},
        { id: 4, title: 'NHL Scores', content: 'NHL', position: { x: 300, y: 0 }},
        { id: 5, title: 'Bookmark', content: 'Bookmark', position: { x: 350, y: 0 }},
        // ...other cards
      ];
      setCards(defaultCards);
      localStorage.setItem('dashboardCards', JSON.stringify(defaultCards));
    }
  }, []);

  const onControlledDrag = (id, x, y) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, position: { x, y }};
      }
      return card;
    });
    setCards(newCards);
    // Save the new card positions to localStorage
    localStorage.setItem('dashboardCards', JSON.stringify(newCards));
  };

  return (
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
        />
      ))}
    </div>
  );
};

export default Dashboard;
