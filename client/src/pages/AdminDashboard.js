import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUser, FaCog, FaCalendarAlt, FaFileAlt, FaLightbulb, FaListUl, FaBars, FaTimes } from 'react-icons/fa';
import Navbar from './Navbar'; // Ensure the path is correct
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <Navbar isLoggedIn={true} username="AdminUser" isAdmin={true} onLogout={() => {}} /> {/* Pass necessary props */}
      <div className="dashboard-content">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>{isSidebarOpen ? 'Admin Panel' : ''}</h2>
          </div>
          <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </div>
          <ul>
            <li>
              <Link to="/admin/dashboard/analytics">
                <FaCog /> {isSidebarOpen && 'Analytics'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/organization">
                <FaUser /> {isSidebarOpen && 'Organization'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/employees">
                <FaUser /> {isSidebarOpen && 'Employees'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/calendar">
                <FaCalendarAlt /> {isSidebarOpen && 'Calendar'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/reports">
                <FaFileAlt /> {isSidebarOpen && 'Reports'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/files">
                <FaFileAlt /> {isSidebarOpen && 'Files'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/directory">
                <FaUser /> {isSidebarOpen && 'Directory'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/elements">
                <FaLightbulb /> {isSidebarOpen && 'Elements'}
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/more">
                <FaListUl /> {isSidebarOpen && 'More'}
              </Link>
            </li>
          </ul>
        </aside>
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;