import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, username, isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    onLogout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    toggleDropdown();
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://th.bing.com/th/id/R.2262cd5bbac37c0595b4cdb76574fb55?rik=zAHxCJF2%2f%2f0xQ&riu=http%3a%2f%2fwww.hotelopro.com%2fblog%2fwp-content%2fuploads%2f2016%2f12%2ffeedback_logo.png&ehk=DJnv8DQFoh25cTwynPDCNRb9pHej9k9lCv3VtoSPK8Y%3d&risl=&pid=ImgRaw&r=0"
          alt="Website Logo"
          className="navbar-logo"
        />
        <Link to="/" className="navbar-link">Home</Link>
        {isLoggedIn && <Link to="/home" className="navbar-link">Feedback</Link>}
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="navbar-dropdown">
            <button className="shadow__btn" onClick={toggleDropdown}>
              Welcome, {username}
            </button>
            {isDropdownOpen && (
              <div className="navbar-dropdown-content">
                {isAdmin && (
                  <button className="shadow__btn" onClick={handleAdminClick}>
                    Admin
                  </button>
                )}
                <button className="shadow__btn" onClick={handleSettingsClick}>
                  Settings
                </button>
                <button className="shadow__btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar-link navbar-auth-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link navbar-auth-link">
              Register
            </Link>
            <Link to="/admin" className="navbar-link navbar-auth-link">
              Admin
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;