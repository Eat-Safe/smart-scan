import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import HeaderLogoEatSafe from './HeaderLogoEatSafe.png';
import './Header.css'; // Make sure to create a Header.css file for styling
import Collapse from 'react-bootstrap/Collapse';

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
      <div><img className="logo" src={HeaderLogoEatSafe} alt="logo" /></div>
      <div className="spacer"></div>
      <Collapse in={isMenuOpen} dimension="height">
        <div className={`menu ${isMenuOpen ? 'visible' : ''}`}>
          {/* 'Home' in hamburger menu */}
          <p>
            <Link to="/">Home</Link>
          </p>
          {/* 'Saved Ingredients' in hamburger menu */}
          <p>
            <Link to="/saved-ingredients">Saved Ingredients</Link>
          </p>
          {/* 'About Us' in hamburger menu */}
          <p>
            <Link to="/about-us/">About us</Link>
          </p>
          {/* 'Resources' in hamburger menu */}
          <p>
            <a href="https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens" target="_blank" rel="noopener noreferrer">Resources</a>
          </p>
        </div>
      </Collapse>
    </div>
  );
};

export default Header;