import React from 'react';
import Draggable from 'react-draggable';
import { NFLContent, NHLScoresContent, NBAScoresContent, ClockContent, 
BitcoinPriceContent, BookmarkComponent, F1StandingsWidget, 
CollegeFootballScores, NASAApod, BirthdayReminder } from './content/widgets';
import './DraggableCard.css';

const contentComponents = {
  NFL: NFLContent,
  NHL: NHLScoresContent,
  NBA: NBAScoresContent,
  Clock: ClockContent,
  Bitcoin: BitcoinPriceContent,
  Bookmark: BookmarkComponent,
  F1: F1StandingsWidget,
  College: CollegeFootballScores,
  NASA: NASAApod,
  Birthday: BirthdayReminder,
};

const DraggableCard = ({ id, title, content, position: { x, y }, onControlledDrag, onClose }) => {
  const handleStop = (e, data) => {
    onControlledDrag(id, data.x, data.y);
  };

  const handleClose = () => {
    onClose(id);
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
        <div className="card-title">
          {title}
          <span className="close-button" onClick={handleClose}>x</span>
        </div>
        <ContentComponent />
      </div>
    </Draggable>
  );
};

export default DraggableCard;