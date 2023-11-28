import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;

const CollegeFootballScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard');
        setScores(response.data.events); // Assuming the events contain the scores
        setLoading(false);
      } catch (error) {
        setError('Failed to load College Football scores.');
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentPageScores = scores.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="college-football-scores-content">
      <div className="games-grid">
        {currentPageScores.map((game, index) => {
          const isCompleted = game.status.type.completed;
          const sortedCompetitors = game.competitions[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1);
          return (
            <div key={index} className="game">
              <div className="game-status">
                {isCompleted ? 'Final' : game.status.type.detail}
              </div>
              {sortedCompetitors?.map((team) => (
                <div key={team.id} className="team">
                    {team.team.logo && (
                    <img src={team.team.logo} alt={`${team.team.name} Logo`} className="team-logo" />
                    )}
                    <span>{team.team.name} {isCompleted ? `- ${team.score}` : ''}</span>                </div>
                ))}
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {Array(Math.ceil(scores.length / ITEMS_PER_PAGE)).fill().map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollegeFootballScores;