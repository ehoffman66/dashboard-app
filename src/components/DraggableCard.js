import React from 'react';
import Draggable from 'react-draggable';
import NFLContent from './content/NFLContent';
import NHLScoresContent from './content/NHLScoresContent';
import ClockContent from './content/ClockContent';
import BitcoinPriceContent from './content/BitcoinPriceContent';
import './DraggableCard.css'; // Ensure this path is correct

// ... other imports

const DraggableCard = ({ id, title, content, position, onControlledDrag }) => {
  // Function to handle when dragging stops
  const handleStop = (e, data) => {
    onControlledDrag(id, data.x, data.y);
  };

  // Determine the content to render based on the content prop
  const renderContent = () => {
    switch (content) {
      case 'NFL':
        return <NFLContent />;
      case 'Clock':
        return <ClockContent />;
      case 'Bitcoin':
        return <BitcoinPriceContent />;
      case 'NHL':
        return <NHLScoresContent />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <Draggable
      handle=".card-title"
      defaultPosition={{ x: position.x, y: position.y }}
      onStop={handleStop}
      bounds="parent"
    >
      <div className="draggable-card">
        <div className="card-title">{title}</div>
        {renderContent()}
      </div>
    </Draggable>
  );
};

export default DraggableCard;
