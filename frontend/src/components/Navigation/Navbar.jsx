import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <h1>HarmonyHub</h1>
        </div>

        {/* Main Menu */}
        <div className="navbar-menu">
          <a href="/" className="menu-item active">Home</a>
          <a href="/browse" className="menu-item">Browse</a>
          <a href="/library" className="menu-item">Library</a>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
            </svg>
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <button className="button login-button">Log In</button>
          <button className="button button-primary register-button">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 