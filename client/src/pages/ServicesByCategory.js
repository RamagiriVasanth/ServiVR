import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import './ServicesByCategory.css';

function ServicesByCategory() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const subcategories = location.state?.subcategories || [];

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubcat, setLoadingSubcat] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError('Category not specified.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://servivr.onrender.com/api/services?category=${encodeURIComponent(category)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch services');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setError('Could not load services.');
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Loading services for {category}...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const displayedServices = services.filter(s => s.name !== 'Window Washing');

  const handleSubcategoryClick = async (subcatName) => {
    setLoadingSubcat(true);
    try {
      const res = await fetch(
        `http://https://servivr.onrender.com/api/services?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcatName)}`);
      if (!res.ok) throw new Error('Failed fetching subcategory services');
      const data = await res.json();

      if (data.length > 0) {
        navigate('/dashboard', {
          state: {
            preselectedServiceId: data[0]._id,
            preselectedCategory: category,
          },
        });
      } else {
        navigate('/dashboard', { state: { preselectedCategory: category } });
      }
    } catch (err) {
      console.error('Error fetching subcategory services:', err);
      navigate('/dashboard', { state: { preselectedCategory: category } });
    } finally {
      setLoadingSubcat(false);
    }
  };

  const handleServiceClick = (serviceId) => {
    navigate('/dashboard', {
      state: {
        preselectedServiceId: serviceId,
        preselectedCategory: category,
      },
    });
  };

  return (
    <div className="services-container">
      <h1 className="services-header">Services in "{category}"</h1>

      {subcategories.length > 0 && (
        <div
          className="subcategory-buttons"
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          {subcategories.map((subcat) => {
            const name = subcat.name || 'Unknown';
            const icon = subcat.icon || '🔹';
            const key = subcat._id || name;

            return (
              <button
                key={key}
                onClick={() => handleSubcategoryClick(name)}
                disabled={loadingSubcat}
                className="subcategory-button"
                style={{
                  background: '#0288d1',
                  color: 'white',
                  border: '2px solid #0277bd',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  cursor: loadingSubcat ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s, border-color 0.3s',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      )}

      {displayedServices.length > 0 ? (
        <ul className="service-list" style={{ padding: 0 }}>
          {displayedServices.map(service => {
            const key = service._id || service.name;

            return (
              <li
                key={key}
                className="service-item"
                onClick={() => handleServiceClick(service._id)}
                style={{ cursor: 'pointer' }}
                title="Click to book this service"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleServiceClick(service._id);
                }}
              >
                <div className="service-title">
                  <strong>{service.name}</strong>
                  {service.price && <span className="service-price"> — ₹{service.price}</span>}
                </div>
                {service.description && (
                  <p className="service-description">{service.description}</p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No services available in this category.</p>
      )}

      <Link
        to="/categories"
        className="back-link"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          color: '#0288d1',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        ← Back to Categories
      </Link>
    </div>
  );
}

export default ServicesByCategory;
