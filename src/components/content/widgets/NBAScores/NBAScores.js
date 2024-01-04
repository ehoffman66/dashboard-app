import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import './NBAScores.css';

const ITEMS_PER_PAGE = 6;

const NBAScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getQuarterString = (quarter) => {
    switch (quarter) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      case 4: return '4th';
      default: return `${quarter}th Quarter`;
    }
  };
  
  useEffect(() => {
    const fetchScoreboard = async () => {
      const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
      setScoreboard(response.data);
    };

    fetchScoreboard();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentPageEvents = scoreboard?.events?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="nba-scores-content">
      <div className="games-grid">
        {currentPageEvents?.map((event, index) => {
          const isScheduled = event.status.type.description === "Scheduled";
          const sortedCompetitors = event.competitions[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1);
          return (
            <div key={index} className="game">
              <div className="game-status">
                {isScheduled ? formatDate(event.date) : event.status.type.description === "In Progress" ? `In Progress - ${getQuarterString(event.status.period)} (${event.status.displayClock})` : event.status.type.description}
              </div>
              {sortedCompetitors?.map((team) => (
                <div key={team.id} className="team">
                  {team.team.logo && (
                    <img src={team.team.logo} alt={`${team.team.displayName} Logo`} className="team-logo" />
                  )}
                  <span>{team.team.displayName} {isScheduled ? '' : `- ${team.score}`}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <Pagination count={Math.ceil(scoreboard?.events?.length / ITEMS_PER_PAGE)} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};

export default NBAScoresContent;