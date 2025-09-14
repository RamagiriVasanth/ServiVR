import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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
import './App.css';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <div className="navbar-wrapper">
          <nav className="navbar">
            <div className="navbar-top">
              <NavLink to="/" end className="nav-logo">
                ServiVR
              </NavLink>
            </div>

            <div className="navbar-bottom">
              <div className="nav-left">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Categories
                </NavLink>
                {user && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
              </div>

              <div className="nav-right">
                {user ? (
                  <>
                    <span className="user-greeting">👋 Hi, {user.name}</span>
                    <button onClick={logout} className="logout-btn">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Register
                    </NavLink>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

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
            element={
              <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
