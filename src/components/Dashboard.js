import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';
import update from 'immutability-helper';
import './Dashboard.css'; // Make sure to include the necessary CSS

const Dashboard = () => {
  // Initialize the cards with X and Y coordinates
  const [cards, setCards] = useState([
    { id: 1, title: 'NFL Scores', content: 'NFL', x: 0, y: 0 },
    { id: 2, title: 'Current Time', content: 'Clock', x: 1, y: 0 },
    { id: 3, title: 'Bitcoin Price', content: 'Bitcoin', x: 2, y: 0 },
    // ...other cards
  ]);

  const moveCard = (id, x, y) => {
    // Find the index of the card
    const cardIndex = cards.findIndex((card) => card.id === id);
    // Update the card's position
    setCards(update(cards, {
      [cardIndex]: {
        $merge: { x, y }
      }
    }));
  };

  // Grid settings
  const gridWidth = 300; // Width of a grid cell
  const gridHeight = 200; // Height of a grid cell
  const numColumns = 4; // Number of columns in the grid

  // Convert grid coordinates to pixel values for CSS
  const toCSSPosition = (x, y) => ({
    left: x * gridWidth,
    top: y * gridHeight,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard">
        {cards.map((card, index) => {
          const { x, y } = card;
          const style = toCSSPosition(x, y);
          return (
            <DraggableCard
              key={card.id}
              id={card.id}
              title={card.title}
              content={card.content}
              index={index}
              moveCard={moveCard}
              style={style}
              numColumns={numColumns}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

export default Dashboard;
