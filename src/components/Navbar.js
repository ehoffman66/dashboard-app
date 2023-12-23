import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import './Navbar.css';

const Navbar = ({ widgets, handleWidgetClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  const handleMarketplaceClick = () => {
    setMarketplaceOpen(prevState => !prevState);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const filteredWidgets = widgets.filter((widget) =>
    widget.title && typeof widget.title === 'string' && widget.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar">
      <Grid container alignItems="center">
        <Grid item xs style={{ textAlign: 'center' }}>
          <h1 className="navbar-title">DashPoint</h1>
        </Grid>
        <Grid item>
          <IconButton onClick={toggleSettings}>
            <SettingsIcon />
          </IconButton>
          <Drawer 
            anchor="right" 
            open={settingsOpen} 
            onClose={toggleSettings}
            PaperProps={{ 
              style: { width: '50%', maxWidth: '600px' }, 
            }}
          >
            <div className="drawer-content">
              <h2 className="drawer-title">Settings</h2>
            </div>
          </Drawer>
          <IconButton onClick={handleMarketplaceClick}>
            <ShoppingCartIcon />
          </IconButton>
          <Drawer 
            anchor="right" 
            open={marketplaceOpen} 
            onClose={handleMarketplaceClick}
            PaperProps={{ 
              style: { width: '50%', maxWidth: '600px' }, 
            }}
          >
            <div className="drawer-content">
              <h2 className="drawer-title">Marketplace</h2>
              <div className="search-container" style={{ width: '80%', margin: '0 auto' }}>
                <SearchIcon className="search-icon" />
                <TextField
                  className="search-input"
                  label="Search Widgets"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  variant="standard"
                  fullWidth
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
          </Drawer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Navbar;