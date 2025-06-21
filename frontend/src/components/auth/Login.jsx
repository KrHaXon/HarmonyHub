import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '', // jeśli chcesz logować po nazwie użytkownika
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log("RECEIVED TOKEN FROM BACKEND:", data.token); 
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        window.location.href = '/'; 
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-title">Welcome Back</h1>

        {/* Jeśli chcesz dodać pole loginu po userName, odkomentuj poniższy blok
        <div className="form-group">
          <label className="form-label" htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className={`form-input ${errors.userName ? 'error' : ''}`}
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your username"
            disabled={isLoading}
          />
          {errors.userName && <div className="error-message">{errors.userName}</div>}
        </div>
        */}

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="checkbox-input"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label className="checkbox-label" htmlFor="rememberMe">Remember me</label>
            <Link to="/forgot-password" className="auth-link forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;