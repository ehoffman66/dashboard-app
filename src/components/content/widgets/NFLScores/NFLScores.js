import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NFLScores.css'; // Ensure this is the path to your CSS file

const NFLScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6); // Number of games you want per page

  useEffect(() => {
    const apiEndpoint = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

    axios.get(apiEndpoint)
      .then(response => {
        setScoreboard(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching NFL data:', err);
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

  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;
  const currentGames = scoreboard?.events?.slice(firstGameIndex, lastGameIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = scoreboard?.events ? Math.ceil(scoreboard.events.length / gamesPerPage) : 0;

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
              {event.competitions[0]?.competitors?.map((team) => (
                <div key={team.id} className="team">
                  {team.team.logo && (
                    <img src={team.team.logo} alt={`${team.team.displayName} Logo`} className="team-logo" />
                  )}
                  <span>{team.team.displayName} - {team.score || 'TBD'}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages).keys()].map(number => (
            <button key={number} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFLScoresContent;
