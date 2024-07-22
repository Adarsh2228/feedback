import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import HomePage1 from './pages/Home1';
import Details from './pages/Details';
import NewFeedback from './pages/NewFeedback';
import EditFeedback from './pages/EditFeedback';
import RoadMap from './pages/RoadMap';
<<<<<<< HEAD
import Navbar from './pages/Navbar';
=======
import Navbar from './pages/Navbar'; // Corrected path
>>>>>>> 10a4a97308d6bbf858d11a986c1e9f544668051c
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminOrganization from './pages/AdminOrganization';
import AdminEmployees from './pages/AdminEmployees';
import AdminReports from './pages/AdminReports';
import AdminFiles from './pages/AdminFiles';
import PasswordVerification from './pages/PasswordVerification';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';

    if (token) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
        setIsLoggedIn(true);
        setIsAdmin(adminStatus);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setUsername('');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar 
        isLoggedIn={isLoggedIn} 
        username={username} 
        isAdmin={isAdmin}
        onLogout={handleLogout} 
      />
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productRequests/new" element={<NewFeedback />} />
        <Route path="/productRequests/:requestId" element={<Details />} />
        <Route path="/productRequests/:requestId/edit" element={<EditFeedback />} />
        <Route path="/roadMap" element={<RoadMap />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/admin" element={<PasswordVerification />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="organization" element={<AdminOrganization />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="files" element={<AdminFiles />} />
          <Route path="roadmap" element={<RoadMap />} />
          <Route path="*" element={<Navigate to="/admin/dashboard/analytics" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;