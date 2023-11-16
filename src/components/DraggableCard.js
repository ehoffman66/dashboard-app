import React from 'react';
import Draggable from 'react-draggable';
import NFLContent from './content/widgets/NFLScores/NFLScores';
import NHLScoresContent from './content/widgets/NHLScores/NHLScores';
import NBAScoresContent from './content/widgets/NBAScores/NBAScores';
import ClockContent from './content/widgets/Clock/Clock';
import BitcoinPriceContent from './content/widgets/BitcoinPrice/BitcoinPrice';
import BookmarkComponent from './content/widgets/Bookmarks/Bookmarks';
import F1StandingsWidget from './content/widgets/F1Standings/F1Standings';
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