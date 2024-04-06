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

        {/* 'Home' in hamburger menu */}
        <p>
        <a href="/smart-scan/">Home</a>
        </p>

        {/* 'About Us' in hamburger menu */}
        <p>About us</p>

        {/* 'Resources' in hamburger menu */}
        <p>
        <a href="https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens" target="_blank" rel="noopener noreferrer">Resources</a>
        </p>
        
      </div>
    </div>
  );
};

export default Header;
