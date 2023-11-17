import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NBAScores.css';

const NBAScoresContent = () => {
  const [scoreboard, setScoreboard] = useState(null);

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

  return (
    <div className="nba-scores-content">
      <div className="games-grid">
        {scoreboard?.events?.map((event, index) => {
          const isScheduled = event.status.type.description === "Scheduled";
          const sortedCompetitors = event.competitions[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1);
          return (
            <div key={index} className="game">
              <div className="game-status">
                {isScheduled ? formatDate(event.date) : event.status.type.description}
              </div>
              {sortedCompetitors?.map((team) => (
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

export default NBAScoresContent;