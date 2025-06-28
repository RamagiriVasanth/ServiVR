import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import Review from './pages/Review';

import Home from './pages/Home';
import Categories from './pages/Categories';
import ServicesByCategory from './pages/ServicesByCategory';
import Dashboard from './components/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (for better UX)
  const handleLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-logo" onClick={handleLinkClick}>
            ServiVR
          </Link>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/categories" onClick={handleLinkClick}>
              Categories
            </Link>
            {user && (
              <Link to="/dashboard" onClick={handleLinkClick}>
                Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <span className="greeting">👋 Hi, {user.name}</span>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <div className={`nav-auth-links ${menuOpen ? 'open' : ''}`}>
              <Link to="/register" onClick={handleLinkClick}>
                Register
              </Link>
              <Link to="/login" onClick={handleLinkClick}>
                Login
              </Link>
            </div>
          )}

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/services/:category" element={<ServicesByCategory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<Review />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<h2 style={{ textAlign: 'center', marginTop: '2rem' }}>404 - Page Not Found</h2>}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
