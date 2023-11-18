import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './F1Standings.css';

const ITEMS_PER_PAGE = 10;

const F1StandingsWidget = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = 'https://ergast.com/api/f1/current/driverStandings.json';
    
    axios.get(endpoint)
      .then(response => {
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setStandings(driverStandings);
        setLoading(false);
      })
      .catch(err => {
        const errMsg = 'Failed to load F1 Standings.';
        console.error(`${errMsg}`, err);
        setError(errMsg);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading F1 Standings...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageStandings = standings.slice(startIndex, endIndex);

  return (
    <div className="f1-standings-widget">
      <ol>
        {currentPageStandings.map((standing, index) => (
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
      <div className="pagination">
        {Array(Math.ceil(standings.length / ITEMS_PER_PAGE)).fill().map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default F1StandingsWidget;