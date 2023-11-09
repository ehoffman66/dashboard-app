import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NBAScoresContent.css'; // Make sure to import the CSS file

const NFLScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiEndpoint = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

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

  if (loading) return <div>Loading NFL scores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="nfl-scores-content">
      <div className="games-grid">
        {scoreboard?.events?.map((event, index) => {
          const isScheduled = event.status.type.description === "Scheduled";
          return (
            <div key={index} className="game">
              <div className="game-status">
                {isScheduled ? formatDate(event.date) : event.status.type.description}
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
    </div>
  );
};

export default NFLScoresContent;
