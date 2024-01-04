import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const ITEMS_PER_PAGE = 6;

const NFLScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
      .then(response => {
        setScoreboard(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load NFL scores.');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentGames = scoreboard?.events?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) return <div>Loading NFL scores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="nfl-scores-content">
      <div className="games-grid">
        {currentGames?.map((event, index) => {
          const isScheduled = event.status.type.description === "Scheduled";
          return (
            <div key={index} className="game">
              <div className="game-status">
                {isScheduled ? formatDate(event.competitions[0].date) : event.status.type.description}
              </div>
              {event.competitions[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1).map((team) => (
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Pagination count={Math.ceil(scoreboard?.events?.length / ITEMS_PER_PAGE)} page={currentPage} onChange={handleChange} />
      </div>
    </div>
  );
};

export default NFLScoresContent;