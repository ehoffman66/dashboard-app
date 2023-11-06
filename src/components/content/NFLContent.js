import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NFLScoresContent.css'; // Make sure to import the CSS file

const NFLScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiEndpoint = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

    axios.get(apiEndpoint)
      .then(response => {
        console.log(response.data); // Log to inspect the structure
        setScoreboard(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching NFL data:', error);
        setError('Failed to load NFL scores.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading NFL scores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="nfl-scores-content">
      <div className="games-grid">
        {scoreboard?.events?.map((event, index) => ( // Use optional chaining
          <div key={index} className="game">
            <div className="game-status">{event.status.type.description}</div>
            {event.competitions[0]?.competitors?.map((team) => (
              <div key={team.id} className="team">
                {team.team.logo?.length > 0 && (
                  <img src={team.team.logo} alt={`${team.team.displayName} Logo`} className="team-logo" />
                )}
                {team.team.displayName} - {team.score}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFLScoresContent;
