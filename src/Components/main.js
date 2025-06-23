import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Main.css'; // Ensure you have styles for the menu

export default function Mainmenu() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };

  return (
    <div>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleMenu} 
        aria-expanded={isOpen} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className={`mainmenu navbar-nav me-auto ${isOpen ? 'show' : ''}`}> {/* Show class based on state */}
        <li className="nav-item">
          <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link to="/electronics" className={`nav-link ${currentPath === '/electronics' ? 'active' : ''}`}>Electronics</Link>
        </li>
        <li className="nav-item">
          <Link to="/jewelery" className={`nav-link ${currentPath === '/jewelery' ? 'active' : ''}`}>Jewelery</Link>
        </li>
        <li className="nav-item">
          <Link to="/mens-clothing" className={`nav-link ${currentPath === '/mens-clothing' ? 'active' : ''}`}>Men's Clothing</Link>
        </li>
        <li className="nav-item">
          <Link to="/womens-clothing" className={`nav-link ${currentPath === '/womens-clothing' ? 'active' : ''}`}>Women's Clothing</Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className={`nav-link ${currentPath === '/products' ? 'active' : ''}`}>All Products</Link>
        </li>
      </ul>
    </div>
  );
}
