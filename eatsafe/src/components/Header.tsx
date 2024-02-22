import React from 'react';
import './Header.css'; // Make sure to create a Header.css file for styling

const Header = () => {
  return (
    <div className="header">
      <div className="menu-icon">
        {/* Here you can add the menu icon */}
        <span>☰</span> {/* This is just a placeholder, replace with your icon */}
      </div>
      <div className="logo">EATSAFE</div>
      <div className="spacer"></div> {/* This is used to push the menu and logo to the sides */}
    </div>
  );
};

export default Header;
