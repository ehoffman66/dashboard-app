import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const ITEMS_PER_PAGE = 6;

const CollegeFootballScores = () => {
  const [scores, setScores] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('scores'); // 'scores' or 'rankings'

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

    const fetchRankings = async () => {
      try {
        const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings');
        setRankings(response.data.rankings[0]['ranks'].slice(0, 25));
        setLoading(false);
      } catch (error) {
        setError('Failed to load College Football rankings.');
        setLoading(false);
      }
    };

    if (view === 'scores') {
      fetchScores();
    } else if (view === 'rankings') {
      fetchRankings();
    }
  }, [view]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentPageData = view === 'scores' ? scores.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : rankings;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="college-football-scores-content">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div 
          className={`view-type ${view === 'scores' ? 'underline' : ''}`} 
          onClick={() => setView('scores')}
        >
          Scores
        </div>
        <div 
          className={`view-type ${view === 'rankings' ? 'underline' : ''}`} 
          onClick={() => setView('rankings')}
        >
          Rankings
        </div>
      </div>
      <div className="games-grid">
        {view === 'scores' ? (
          currentPageData.map((game, index) => {
            const isCompleted = game.status?.type?.completed;
            const sortedCompetitors = game.competitions?.[0]?.competitors?.sort((a, b) => a.homeAway === 'home' ? 1 : -1);
            return (
              <div key={index} className="game">
                <div className="game-status">
                  {isCompleted ? 'Final' : game.status?.type?.detail}
                </div>
                {sortedCompetitors?.map((team) => (
                  <div key={team.id} className="team">
                    {team.team.logo && (
                      <img src={team.team.logo} alt={`${team.team.name} Logo`} className="team-logo" />
                    )}
                    <span>{team.team.name} {isCompleted ? `- ${team.score}` : ''}</span>
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <>
            <div className="rankings-container">
              {rankings.slice(0, 13).map((ranking, index) => (
                <div key={index} className="ranking">
                  <span>{ranking.current} {ranking.team.name}</span>
                </div>
              ))}
            </div>
            <div className="rankings-container">
              {rankings.slice(13).map((ranking, index) => (
                <div key={index} className="ranking">
                  <span>{ranking.current} {ranking.team.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Pagination count={Math.ceil((view === 'scores' ? scores.length : rankings.length) / ITEMS_PER_PAGE)} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};

export default CollegeFootballScores;