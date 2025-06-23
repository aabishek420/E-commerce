import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Main.css';

export default function Mainmenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <ul className="mainmenu">
        <li>
          <Link to="/" className={currentPath === '/' ? 'active' : ''}>Categories</Link>
        </li>
        <li>
          <Link to="/electronics" className={currentPath === '/electronics' ? 'active' : ''}>Electronics</Link>
        </li>
        <li>
          <Link to="/jewelery" className={currentPath === '/jewelery' ? 'active' : ''}>Jewelery</Link>
        </li>
        <li>
          <Link to="/mens-clothing" className={currentPath === '/mens-clothing' ? 'active' : ''}>Men's Clothing</Link>
        </li>
        <li>
          <Link to="/womens-clothing" className={currentPath === '/womens-clothing' ? 'active' : ''}>Women's Clothing</Link>
        </li>
        <li>
          <Link to="/products" className={currentPath === '/products' ? 'active' : ''}>All Products</Link>
        </li>
      </ul>
    </div>
  );
}
