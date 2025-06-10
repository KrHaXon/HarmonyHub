import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const AuthNavbar = () => {
  return (
    <nav className="navbar auth-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <h1>HarmonyHub</h1>
          </Link>
        </div>

        {/* Right-side links */}
        <div className="navbar-auth">
          <Link to="/login" className="button login-button">Log In</Link>
          <Link to="/register" className="button button-primary register-button">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar; 