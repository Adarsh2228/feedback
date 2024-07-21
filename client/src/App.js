import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import HomePage1 from './pages/Home1';
import Details from './pages/Details';
import NewFeedback from './pages/NewFeedback';
import EditFeedback from './pages/EditFeedback';
import RoadMap from './pages/RoadMap';
import Navbar from './pages/Navbar'; // Corrected path
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productRequests/new" element={<NewFeedback />} />
        <Route path="/productRequests/:requestId" element={<Details />} />
        <Route path="/productRequests/:requestId/edit" element={<EditFeedback />} />
        <Route path="/roadMap" element={<RoadMap />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
