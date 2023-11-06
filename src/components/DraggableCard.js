import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import NFLContent from './content/NFLContent'; // Make sure these paths are correct
import ClockContent from './content/ClockContent';
import BitcoinPriceContent from './content/BitcoinPriceContent';
import './DraggableCard.css'; // Ensure this path is correct

const DraggableCard = ({ id, index, moveCard, contentComponent, title }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const renderCardContent = () => {
    switch (contentComponent) {
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

  const cardStyle = {
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={ref} style={cardStyle} className="card">
      <div className="card-title">{title}</div>
      {renderCardContent()}
    </div>
  );
};

export default DraggableCard;
