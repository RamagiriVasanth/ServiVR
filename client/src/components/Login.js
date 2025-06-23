import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';  // Import toast for styled alerts
import './Login.css'; // Importing CSS styles

const Login = () => {
  const { login, demoLogin } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('https://servivr.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); // AuthContext will show toast for success
        navigate('/'); // Redirect to home
      } else {
        toast.error(data.msg || '❌ Login failed'); // Styled error toast
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error during login'); // Styled error toast
    }
  };

  // Handler for demo login
  const handleDemoLogin = () => {
    demoLogin(); // AuthContext will show toast for demo login success
    navigate('/'); // Redirect to home after demo login
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        required
      />
      <button type="submit">Login</button>

      {/* OR separator */}
      <div
        style={{
          textAlign: 'center',
          margin: '1rem 0',
          fontWeight: 'bold',
          color: '#888',
        }}
      >
        or
      </div>

      {/* Demo Login button */}
      <button
        type="button"
        onClick={handleDemoLogin}
        style={{ backgroundColor: '#555', color: 'white', width: '100%' }}
      >
        Demo Login
      </button>

      {/* Caption below demo login button */}
      <p
        style={{
          marginTop: '1rem',
          fontStyle: 'italic',
          color: '#666',
          textAlign: 'center',
          fontSize: '0.9rem',
        }}
      >
        No credentials needed for demo login.
      </p>
    </form>
  );
};

export default Login;
