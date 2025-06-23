import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BookingForm from './BookingForm';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  console.log('Dashboard location.state:', location.state); // Debug

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'Guest'}!</h1>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>

      <section className="booking-section">
        <h2>Book a Service</h2>
        <BookingForm preselect={location.state || {}} />
      </section>
    </div>
  );
}

export default Dashboard;
