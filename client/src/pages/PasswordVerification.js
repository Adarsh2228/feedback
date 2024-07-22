// src/pages/PasswordVerification.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordVerification.css'; // Ensure you have a corresponding CSS file

const PasswordVerification = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'adminhumai') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="password-verification-container">
      <div className="password-verification-form">
        <form onSubmit={handleSubmit}>
          <h2>Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter admin password"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordVerification;
