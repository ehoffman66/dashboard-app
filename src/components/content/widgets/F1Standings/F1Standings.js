import React, { useState, useEffect } from 'react';
import './F1Standings.css';

const ITEMS_PER_PAGE = 10;

const F1StandingsWidget = () => {
  const [standings, setStandings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [standingsType, setStandingsType] = useState('driver');

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/${standingsType}Standings.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const standingsList = data.MRData.StandingsTable.StandingsLists[0];
        setStandings(standingsType === 'driver' ? standingsList.DriverStandings : standingsList.ConstructorStandings);
      })
      .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));
  }, [standingsType]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageStandings = standings.slice(startIndex, endIndex);

  return (
    <div className="f1-standings-widget">
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div 
          className={`standings-type ${standingsType === 'driver' ? 'underline' : ''}`} 
          onClick={() => setStandingsType('driver')}
        >
          Driver
        </div>
        <div 
          className={`standings-type ${standingsType === 'constructor' ? 'underline' : ''}`} 
          onClick={() => setStandingsType('constructor')}
        >
          Constructor
        </div>
      </div>
      <ul>
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
      </ul>
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