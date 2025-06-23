import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // For styled alerts
import './Register.css';

const Register = () => {
  const { login, demoLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://https://servivr.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); // AuthContext will show toast for success
        navigate('/'); // redirect to home
      } else {
        toast.error(data.msg || '❌ Registration failed'); // styled error toast
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error during registration'); // styled error toast
    }
  };

  // Demo login handler
  const handleDemoLogin = () => {
    demoLogin(); // AuthContext will show toast for demo login success
    navigate('/'); // redirect to home after demo login
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={onChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
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

        <button type="submit">Register</button>

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
    </div>
  );
};

export default Register;
