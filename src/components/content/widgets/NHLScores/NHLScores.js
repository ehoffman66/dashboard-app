import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;

const NHLScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const apiEndpoint = 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard';

    axios.get(apiEndpoint)
      .then(response => {
        setScoreboard(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching NFL data:', error);
        setError('Failed to load NFL scores.');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short', // "Sat"
      month: 'short', // "Jun"
      day: '2-digit', // "01"
      year: 'numeric', // "2019"
      hour: '2-digit', // "12"
      minute: '2-digit', // "00"
      hour12: true // Use 12-hour format
    });
  };

  const getPeriodString = (period) => {
    switch (period) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      default: return `${period}th`;
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading NFL scores...</div>;
  if (error) return <div>{error}</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageEvents = scoreboard?.events?.slice(startIndex, endIndex);

  return (
    <div className="nhl-scores-content">
      <div className="games-grid">
        {currentPageEvents?.map((event, index) => {
          const isScheduled = event.status.type.description === "Scheduled";
          const sortedCompetitors = event.competitions[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1);
          return (
            <div key={index} className="game">
            <div className="game-status">
              {isScheduled ? formatDate(event.date) : event.status.type.description === "Final" ? "Final" : `${event.status.type.description} - ${getPeriodString(event.status.period)} (${event.status.displayClock})`}
            </div>
              {sortedCompetitors?.map((team) => (
                <div key={team.id} className="team">
                  {team.team.logo && (
                    <img src={team.team.logo} alt={`${team.team.displayName} Logo`} className="team-logo" />
                  )}
                    <span>{team.team.displayName} {isScheduled ? '' : '- ' + team.score}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {Array(Math.ceil((scoreboard?.events?.length || 0) / ITEMS_PER_PAGE)).fill().map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
  
  };
  
  export default NHLScoresContent;