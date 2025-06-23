// src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { AuthContext } from '../context/AuthContext';

const steps = [
  { number: 1, icon: '🔍', title: 'Browse Services', description: 'Explore categories or search for the service you need.' },
  { number: 2, icon: '📅', title: 'Book Service', description: 'Select your service and schedule a convenient time.' },
  { number: 3, icon: '👷', title: 'Professional Arrives', description: 'A qualified serviceman comes to your home to get the job done.' },
  { number: 4, icon: '⭐', title: 'Enjoy & Review', description: 'Experience quality service and leave your feedback.' },
];

function Home() {
  const navigate = useNavigate();
  const { demoLogin, user, token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(fetch('https://servivr.onrender.com/api/categories'))
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load categories.');
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/services/${encodeURIComponent(category.name)}`, {
      state: { subcategories: category.subcategories },
    });
  };

  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/');
  };

  const handlePostReview = () => {
    if (token) {
      navigate('/review');
    } else {
      localStorage.setItem('redirectAfterLogin', '/review');
      navigate('/login');
    }
  };

  // Fix applied here: use sub.name instead of sub directly
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search) ||
      (cat.subcategories &&
        cat.subcategories.some((sub) => sub.name.toLowerCase().includes(search)))
  );

  return (
    <div className="home-container">

      {/* Header */}
      <header className="home-header">
        <h1>Welcome to ServiVR</h1>
        <p>Your one-stop platform for booking reliable local home services.</p>
        <button className="cta-button" onClick={() => navigate('/categories')}>
          Browse All Categories
        </button>
      </header>

      {/* Intro */}
      <section className="intro-section">
        <h2>What is ServiVR?</h2>
        <p>
          ServiVR is an easy-to-use services booking app that connects you with trusted professionals.
          Simply book a service, and our servicemen will come right to your home to help you with repairs,
          cleaning, maintenance, and much more.
        </p>
      </section>

      {/* Steps */}
      <section className="steps-section">
        <h2>How to Use ServiVR</h2>
        <div className="steps-flow">
          {steps.map((step) => (
            <div key={step.number} className="step" tabIndex={0} aria-label={`Step ${step.number}: ${step.title}`}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon" aria-hidden="true">{step.icon}</div>
              <div className="step-content">
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="offers-section">
        <h2>🎉 Initial Offers Just for You!</h2>
        <ul>
          <li>10% off on your first service booking</li>
          <li>Free home inspection for AC repairs</li>
          <li>Buy one cleaning, get one room free</li>
          <li>Special discounts on mobile screen replacements</li>
        </ul>
      </section>

      {/* Search */}
      <input
        type="text"
        placeholder="Search for services..."
        className="search-input"
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search for services"
      />

      <hr />

      {/* Categories */}
      <section>
        <h2>Categories</h2>
        {loading && <p>Loading categories...</p>}
        {error && <p>{error}</p>}

        <div className="categories-grid">
          {!loading && !error && (filteredCategories.length ? (
            filteredCategories.map((cat) => (
              <button
                key={cat.name}
                className="category-icon"
                onClick={() => handleCategoryClick(cat)}
                type="button"
                aria-label={`Go to ${cat.name} services`}
              >
                <span className="category-emoji">{cat.icon}</span>
                <span className="category-label">{cat.name}</span>
              </button>
            ))
          ) : (
            <p>No categories found matching your search.</p>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="featured-services">
        <h2>Popular Services</h2>
        <ul>
          <li>❄️ AC Repair & Gas Filling</li>
          <li>📱 Mobile Screen Replacement</li>
          <li>🧼 Sofa Deep Cleaning</li>
          <li>🔧 Bathroom Leak Fix</li>
        </ul>
      </section>

      {/* Testimonials + Post Review */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <blockquote>“Very quick and professional service!” – User1</blockquote>
        <blockquote>“AC installation done in just 2 hours. Loved it!” – User2</blockquote>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={handlePostReview} className="cta-button" type="button">
            Post Your Review
          </button>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="home-footer">
        <p>Ready to get started?</p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/register')} className="btn-register" type="button">
            Create an Account
          </button>
          <button onClick={() => navigate('/login')} className="btn-login" type="button">
            Login
          </button>
        </div>

        <div className="or-separator">or</div>

        <button className="btn-demo" onClick={handleDemoLogin} aria-label="Login as demo user" type="button">
          Demo Login
        </button>

        <p className="demo-caption">No credentials needed for demo login.</p>
      </footer>
    </div>
  );
}

export default Home;
