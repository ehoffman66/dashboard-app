import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollegeFootballScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>College Football Scores</h2>
      <ul>
        {scores.map((game) => (
          <li key={game.id}>
            {game.competitions[0].competitors[0].team.name} vs. {game.competitions[0].competitors[1].team.name}
            {' - '}
            {game.status.type.completed ? 'Final' : game.status.type.detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeFootballScores;
