import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Main.css';

export default function Mainmenu() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mainmenu-container">
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleMenu} 
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <ul className={`mainmenu ${isOpen ? 'show' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={currentPath === '/' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
        </li>
        <li>
          <Link 
            to="/electronics" 
            className={currentPath === '/electronics' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Electronics
          </Link>
        </li>
        <li>
          <Link 
            to="/jewelery" 
            className={currentPath === '/jewelery' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Jewelery
          </Link>
        </li>
        <li>
          <Link 
            to="/mens-clothing" 
            className={currentPath === '/mens-clothing' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Men's Clothing
          </Link>
        </li>
        <li>
          <Link 
            to="/womens-clothing" 
            className={currentPath === '/womens-clothing' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Women's Clothing
          </Link>
        </li>
        <li>
          <Link 
            to="/products" 
            className={currentPath === '/products' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            All Products
          </Link>
        </li>
      </ul>
    </div>
  );
}