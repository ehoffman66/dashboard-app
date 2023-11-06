import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';

const Dashboard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'NFL Scores', contentComponent: 'NFL' },
    { id: 2, title: 'Current Time', contentComponent: 'Clock' },
    { id: 3, title: 'Bitcoin Price', contentComponent: 'Bitcoin' },
    // ...other cards
  ]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const draggedItem = newCards.splice(dragIndex, 1)[0];
      newCards.splice(hoverIndex, 0, draggedItem);
      return newCards;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard">
        {cards.map((card, index) => (
          <DraggableCard
            key={card.id}
            index={index}
            id={card.id}
            title={card.title}
            contentComponent={card.contentComponent}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Dashboard;
