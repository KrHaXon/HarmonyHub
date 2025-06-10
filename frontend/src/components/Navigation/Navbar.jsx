import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <h1>HarmonyHub</h1>
          </Link>
        </div>

        {/* Main Menu */}
        <div className="navbar-menu">
          <Link to="/" className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/browse" className={`menu-item ${location.pathname === '/browse' ? 'active' : ''}`}>Browse</Link>
          <Link to="/library" className={`menu-item ${location.pathname === '/library' ? 'active' : ''}`}>Library</Link>
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
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="button login-button">Log In</Link>
              <Link to="/register" className="button button-primary register-button">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="button profile-button">My Profile</Link>
              <button className="button logout-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 