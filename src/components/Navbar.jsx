import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Menu, X, LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dyann', label: 'Dyann' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assistant', label: 'Assistant' },
    { path: '/reviews', label: 'Reviews' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(false);
    // Navigate to profile page or settings
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Dyann AI</span>
          <span className="logo-subtitle">by Crossconnectors</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar-profile">
          <button className="profile-button" onClick={toggleProfile}>
            <User size={20} />
            {currentUser && (
              <span className="user-email">{currentUser.email}</span>
            )}
          </button>
          
          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <h4>Welcome!</h4>
                <p>{currentUser?.email}</p>
              </div>
              <div className="profile-actions">
                <button onClick={handleProfileClick} className="profile-action">
                  <Settings size={16} />
                  Settings
                </button>
                <button onClick={handleProfileClick} className="profile-action">
                  <BarChart3 size={16} />
                  Analytics
                </button>
                <button onClick={handleLogout} className="profile-action logout">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
