import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ widgets }) => {
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMarketplaceClick = () => {
    setSidePanelOpen(true);
  };

  const handleCloseClick = () => {
    setSidePanelOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleWidgetClick = (widget) => {
    console.log(`Widget clicked: ${widget.title}`);
  };

  const filteredWidgets = widgets.filter(widget =>
    widget.title && typeof widget.title === 'string' && widget.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar">
      <h1 className="navbar-title">DashPoint</h1>
      <FontAwesomeIcon 
        icon={faShoppingCart} 
        className="navbar-marketplace" 
        onClick={handleMarketplaceClick} 
      />
      {isSidePanelOpen && (
        <div className={`side-panel ${isSidePanelOpen ? 'side-panel-open' : ''}`}>
          <FontAwesomeIcon 
            icon={faTimes} 
            className="side-panel-close" 
            onClick={handleCloseClick} 
          />
          <h2 className="side-panel-title">Marketplace</h2>
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search widgets"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <ul className="widget-list">
            {filteredWidgets.map((widget, index) => (
              <li key={index} className="widget-list-item" onClick={() => handleWidgetClick(widget)}>
                {widget.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;