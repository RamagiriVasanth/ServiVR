import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';  // Correct import for lottie-react
import repairAnimation from '../assets/Wrench.json';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/categories`)
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

  if (loading)
    return (
      <div className="loading-container">
        <Lottie animationData={repairAnimation} loop={true} autoplay={true} style={{ height: 200, width: 200 }} />
        <p>Loading categories...</p>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="categories-container">
      <h1>Select a Category</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <button
            key={cat._id || cat.name}
            className="category-icon"
            onClick={() => handleCategoryClick(cat)}
            type="button"
            aria-label={`Go to ${cat.name} services`}
          >
            <span className="category-emoji">{cat.icon}</span>
            <span className="category-label">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
