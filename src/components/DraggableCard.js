import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import NFLContent from './content/NFLContent';
import ClockContent from './content/ClockContent';
import BitcoinPriceContent from './content/BitcoinPriceContent';
import './DraggableCard.css';

const DraggableCard = ({ id, index, moveCard, content, title }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveCard(item.index, dropResult.index);
      }
    },
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
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

  const renderContent = () => {
    switch (content) {
      case 'NFL':
        return <NFLContent />;
      case 'Clock':
        return <ClockContent />;
      case 'Bitcoin':
        return <BitcoinPriceContent />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className="draggable-card">
      <div className="card-title">{title}</div>
      {renderContent()}
    </div>
  );
};

export default DraggableCard;
