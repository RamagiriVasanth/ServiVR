import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './BookingForm.css';

function BookingForm({ preselect = {} }) {
  const { user } = useContext(AuthContext);

  const preselectedServiceId = preselect.preselectedServiceId || '';
  const preselectedCategory = preselect.preselectedCategory || '';

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingServices, setLoadingServices] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customService, setCustomService] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [initializedPreselection, setInitializedPreselection] = useState(false);
  const [categoryChangedByUser, setCategoryChangedByUser] = useState(false);

  console.log('BookingForm preselect:', preselect); // Debug

  // Fetch categories on mount
  useEffect(() => {
    setLoadingCategories(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoadingCategories(false);
      });
  }, []);

  // Set category from preselection once categories load
  useEffect(() => {
    if (!loadingCategories && preselectedCategory) {
      const found = categories.find(cat => cat.name === preselectedCategory);
      if (found) {
        setSelectedCategory(preselectedCategory);
      }
    }
  }, [loadingCategories, preselectedCategory, categories]);

  // Fetch services when selectedCategory changes
  useEffect(() => {
    if (!selectedCategory) {
      setServices([]);
      setLoadingServices(false);
      setSelectedService('');
      return;
    }

    setLoadingServices(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/services?category=${encodeURIComponent(selectedCategory)}`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoadingServices(false);
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoadingServices(false);
      });
  }, [selectedCategory]);

  // Set preselected service after services are loaded
  useEffect(() => {
    if (
      !loadingServices &&
      services.length > 0 &&
      preselectedServiceId &&
      !initializedPreselection
    ) {
      const match = services.find(s => s._id === preselectedServiceId);
      if (match) {
        setSelectedService(preselectedServiceId);
        setInitializedPreselection(true);
      }
    }
  }, [loadingServices, services, preselectedServiceId, initializedPreselection]);

  // Reset selected service if user manually changes category
  useEffect(() => {
    if (categoryChangedByUser && initializedPreselection) {
      setSelectedService('');
      setCustomService('');
      setInitializedPreselection(false);
      setCategoryChangedByUser(false);
    }
  }, [selectedCategory, categoryChangedByUser, initializedPreselection]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategoryChangedByUser(true);
  };

  const subcategories = categories.find(c => c.name === selectedCategory)?.subcategories || [];

  // This filters services only by selected category
  const servicesForCategory = services.filter(s => {
    const catName = typeof s.category === 'object' ? s.category.name : s.category;
    return catName === selectedCategory;
  });

  if (loadingCategories || loadingServices) return <p>Loading booking form...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedCategory) return setMessage('Please select a category.');
    if (!selectedService && !customService.trim()) return setMessage('Please select or enter a service.');
    if (!phone.trim()) return setMessage('Please enter your phone number.');
    if (!user) return setMessage('You must be logged in to book a service.');

    setMessage('🙏 Thank you for using this demo app!');

    setSelectedCategory('');
    setSelectedService('');
    setCustomService('');
    setPhone('');
    setEmail('');
    setInitializedPreselection(false);
    setCategoryChangedByUser(false);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange} required>
          <option value="" disabled>
            --Select Category--
          </option>
          {categories.map(cat => (
            <option key={cat._id || cat.name} value={cat.name}>
              {cat.icon ? `${cat.icon} ` : ''}
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Service:
        <select
          value={selectedService}
          onChange={e => setSelectedService(e.target.value)}
          disabled={!selectedCategory || !!customService.trim()}
          required={!customService.trim()}
        >
          <option value="" disabled>
            --Select Service--
          </option>
          {(subcategories.length > 0 ? subcategories : servicesForCategory).map((s, i) => (
            <option key={s._id || i} value={s._id}>
              {s.name} {s.price ? `— ₹${s.price}` : ''}
            </option>
          ))}
        </select>
      </label>

      <label>
        Or enter your service:
        <input
          type="text"
          value={customService}
          placeholder="Type a service if not listed"
          onChange={e => setCustomService(e.target.value)}
          onFocus={() => setSelectedService('')}
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </label>

      <label>
        Email (optional):
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </label>

      <button type="submit">Book Now</button>
      {message && <p className="booking-message">{message}</p>}
    </form>
  );
}

export default BookingForm;
