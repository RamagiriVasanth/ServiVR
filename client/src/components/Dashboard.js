import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BookingForm from './BookingForm';
import { Player } from '@lottiefiles/react-lottie-player';  // ✅ This is correct
import workerAnimation from '../assets/WorkerYellowAndBlack.json';
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

      <div className="dashboard-content">
        <div className="animation-section">
          <Player
            autoplay
            loop
            src={workerAnimation}
            style={{ height: 300, width: 300 }}
          />
        </div>

        <section className="booking-section">
          <h2>Book a Service</h2>
          <BookingForm preselect={location.state || {}} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
