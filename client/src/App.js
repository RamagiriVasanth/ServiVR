import React, { useContext } from 'react';
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

  return (
    <Router>
      <nav
        style={{
          padding: '1rem 2rem',
          background: '#2c3e50',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              marginRight: '1.5rem',
              color: '#ecf0f1',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            ServiVR
          </Link>
          <Link
            to="/"
            style={{ marginRight: '1rem', color: '#bdc3c7', textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link
            to="/categories"
            style={{ marginRight: '1rem', color: '#bdc3c7', textDecoration: 'none' }}
          >
            Categories
          </Link>
          {user && (
            <Link
              to="/dashboard"
              style={{ marginRight: '1rem', color: '#bdc3c7', textDecoration: 'none' }}
            >
              Dashboard
            </Link>
          )}
        </div>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: '1rem' }}>👋 Hi, {user.name}</span>
              <button
                onClick={logout}
                style={{
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  color: '#fff',
                  padding: '0.4rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                style={{ marginRight: '1rem', color: '#bdc3c7', textDecoration: 'none' }}
              >
                Register
              </Link>
              <Link to="/login" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                Login
              </Link>
            </>
          )}
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
