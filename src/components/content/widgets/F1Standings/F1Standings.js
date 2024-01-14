import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
      <Pagination 
        count={Math.ceil(standings.length / ITEMS_PER_PAGE)} 
        page={currentPage} 
        onChange={handlePageChange} 
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#007BFF',
          },
          '& .Mui-selected': {
            backgroundColor: 'transparent',
          },
          '& .MuiPaginationItem-page:hover': {
            backgroundColor: '#e9ecef',
          },
        }}
      />
    </div>
  );
};

export default F1StandingsWidget;