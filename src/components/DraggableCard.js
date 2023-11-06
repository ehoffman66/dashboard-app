import React from 'react';
import Draggable from 'react-draggable';
import NFLContent from './content/NFLContent';
import ClockContent from './content/ClockContent';
import BitcoinPriceContent from './content/BitcoinPriceContent';
import './DraggableCard.css'; // Ensure this path is correct

const DraggableCard = ({ id, title, content, position, onControlledDrag }) => {
  // Function to handle when dragging starts
  const handleStart = (e, data) => {
    // This could change the z-index if needed
  };

  // Function to handle while dragging
  const handleDrag = (e, data) => {
    onControlledDrag(id, data.x, data.y);
  };

  // Function to handle when dragging stops
  const handleStop = (e, data) => {
    // This could reset the z-index if changed during start
  };

  const renderContent = () => {
    switch (content) {
      case 'NFL':
        return <NFLContent />;
      case 'Clock':
        return <ClockContent />;
      case 'Bitcoin':
        return <BitcoinPriceContent />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <Draggable 
      handle=".card-title" // The part of the card that can be used to drag it
      defaultPosition={{x: position.x, y: position.y}}
      position={null} // Not setting position makes the component controlled
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent" // Restrict movement within the parent element
    >
      <div className="draggable-card">
        <div className="card-title">{title}</div>
        {renderContent()}
      </div>
    </Draggable>
  );
};

export default DraggableCard;
