import React, { useState } from 'react';
import './Header.css'; // Make sure to create a Header.css file for styling

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="menu-icon" onClick={toggleMenu}>
        {/* Here you can add the menu icon */}
        <span>☰</span> {/* This is just a placeholder, replace with your icon */}
      </div>
      <div className="logo">EATSAFE</div>
      <div className="spacer"></div>

      <div className={`menu ${isMenuOpen ? 'visible' : ''}`}>
        {/* Add your menu items and styling here */}
        <p>Info: About us</p>
        <p>Resources</p>
        <p> Upload Image</p>
        <p>Search Allergen</p>
      </div>
    </div>
  );
};

export default Header;
