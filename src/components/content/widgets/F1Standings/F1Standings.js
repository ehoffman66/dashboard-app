import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './F1Standings.css'; // Make sure this is the correct path to your CSS file

const F1StandingsWidget = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = 'https://ergast.com/api/f1/current/driverStandings.json';
    
    axios.get(endpoint)
      .then(response => {
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setStandings(driverStandings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching F1 Standings:', err);
        setError('Failed to load F1 Standings.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading F1 Standings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="f1-standings-widget">
      <ol>
        {standings.map((standing, index) => (
          <li key={index}>
            <span className="driver-name">
              {standing.Driver.givenName} {standing.Driver.familyName}
            </span>
            <span className="driver-points">
              {standing.points} pts
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default F1StandingsWidget;
