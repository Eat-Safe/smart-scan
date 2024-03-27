import React, { useState } from 'react';
import './Menu.css'; // Make sure this path is correct

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <div className="hamburger-icon" onClick={toggleMenu}>
        ☰ {/* Replace with an actual icon or image */}
      </div>
      <div className={`menu-options ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>? Info: About Us</li>
          <li>O Resources</li>
          <li>D Upload Image</li>
          <li>O Search Allergens</li>
          {/* Add more items here */}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
