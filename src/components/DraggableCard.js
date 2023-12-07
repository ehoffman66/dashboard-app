import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import Draggable from 'react-draggable';
import { NFLContent, NHLScoresContent, NBAScoresContent, ClockContent, 
    BitcoinPriceContent, BookmarkComponent, F1StandingsWidget, 
    CollegeFootballScores, NASAApod, BirthdayReminder, OfficeQuotes, Weather } from './content/widgets';
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
  Office: OfficeQuotes,
  Weather: Weather,
};

const DraggableCard = ({ id, title, content, position: { x, y }, onControlledDrag }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ContentComponent = contentComponents[content] || (() => <div>No content available</div>);

  const handleStop = (e, data) => {
    onControlledDrag(id, data.x, data.y);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Draggable handle=".card-title" defaultPosition={{ x, y }} onStop={handleStop} bounds="parent">
      <div className={`draggable-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <div className="card-title">
            {title}
            <Menu as="div" className="menu-container">
              <Menu.Button className="menu-button">
                <MenuIcon className="icon" />
              </Menu.Button>
              <Menu.Items className="menu-items">
                <Menu.Item>
                  {({ active }) => (
                    <button 
                      className={`menu-button ${active ? 'bg-blue-500' : ''}`} 
                      onClick={toggleFlip}
                    >
                      Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button 
                      className={`menu-button ${active ? 'bg-blue-500' : ''}`} 
                      onClick={toggleFlip}
                    >
                      Remove Card
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <div className="card-content">
            <ContentComponent />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableCard;