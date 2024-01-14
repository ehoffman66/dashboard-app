import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import './NFLScores.css';

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
          const homeTeam = event.competitions[0].competitors.find(comp => comp.homeAway === 'home');
          const awayTeam = event.competitions[0].competitors.find(comp => comp.homeAway === 'away');
          const homeScore = parseInt(homeTeam.score);
          const awayScore = parseInt(awayTeam.score);
          const homeWin = homeScore > awayScore;
          const awayWin = awayScore > homeScore;

          return (
            <div key={index} className="game">
              <div className="game-status">
                {event.status.type.description === "Scheduled" ? formatDate(event.competitions[0].date) : event.status.type.description}
              </div>
              <div className={`team ${homeWin ? 'win' : ''}`}>
                {homeTeam.team.logo && (
                  <img src={homeTeam.team.logo} alt={`${homeTeam.team.displayName} Logo`} className="team-logo" />
                )}
                <span>{homeTeam.team.displayName} {event.status.type.description === "Scheduled" ? '' : `- ${homeTeam.score}`}</span>
              </div>
              <div className={`team ${awayWin ? 'win' : ''}`}>
                {awayTeam.team.logo && (
                  <img src={awayTeam.team.logo} alt={`${awayTeam.team.displayName} Logo`} className="team-logo" />
                )}
                <span>{awayTeam.team.displayName} {event.status.type.description === "Scheduled" ? '' : `- ${awayTeam.score}`}</span>
              </div>
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