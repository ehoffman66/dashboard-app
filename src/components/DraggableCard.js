import React from 'react';
import Draggable from 'react-draggable';
import { NFLContent, NHLScoresContent, NBAScoresContent, ClockContent, 
BitcoinPriceContent, BookmarkComponent, F1StandingsWidget } from './content/widgets';
import './DraggableCard.css';

const contentComponents = {
  NFL: NFLContent,
  NHL: NHLScoresContent,
  NBA: NBAScoresContent,
  Clock: ClockContent,
  Bitcoin: BitcoinPriceContent,
  Bookmark: BookmarkComponent,
  F1: F1StandingsWidget,
};

const DraggableCard = ({ id, title, content, position: { x, y }, onControlledDrag }) => {
  const handleStop = (e, data) => {
    onControlledDrag(id, data.x, data.y);
  };

  const ContentComponent = contentComponents[content] || (() => <div>No content available</div>);

  return (
    <Draggable
      handle=".card-title"
      defaultPosition={{ x, y }}
      onStop={handleStop}
      bounds="parent"
    >
      <div className="draggable-card">
        <div className="card-title">{title}</div>
        <ContentComponent />
      </div>
    </Draggable>
  );
};

export default DraggableCard;