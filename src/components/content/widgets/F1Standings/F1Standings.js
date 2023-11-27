import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './F1Standings.css';

const ITEMS_PER_PAGE = 10;

const F1StandingsWidget = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [standingsType, setStandingsType] = useState('driver'); // 'driver' or 'constructor'

  useEffect(() => {
    const endpoint = `https://ergast.com/api/f1/current/${standingsType}Standings.json`;
    
    axios.get(endpoint)
      .then(response => {
        const standingsList = standingsType === 'driver'
          ? response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
          : response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setStandings(standingsList);
        setLoading(false);
      })
      .catch(err => {
        const errMsg = `Failed to load F1 ${standingsType.charAt(0).toUpperCase() + standingsType.slice(1)} Standings.`;
        console.error(`${errMsg}`, err);
        setError(errMsg);
        setLoading(false);
      });
  }, [standingsType]);

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
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div className="standings-type" onClick={() => setStandingsType('driver')}>Driver</div>
        <div className="standings-type" onClick={() => setStandingsType('constructor')}>Constructor</div>
      </div>
      <ol>
        {currentPageStandings.map((standing, index) => (
          <li key={index}>
            <span className="driver-name">
              {standingsType === 'driver'
                ? standing.Driver ? `${standing.Driver.givenName} ${standing.Driver.familyName}` : ''
                : standing.Constructor ? standing.Constructor.name : ''}
            </span>
            <span className="driver-points">
              {standing.points} pts
            </span>
          </li>
        ))}
      </ol>
      <div className="pagination">
        {Array(Math.ceil(standings.length / ITEMS_PER_PAGE)).fill().map((_, index) => (
          <button className="pagination-button" key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default F1StandingsWidget;