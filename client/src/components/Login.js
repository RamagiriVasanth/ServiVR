import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const { login, demoLogin } = useContext(AuthContext);
  const navigate = useNavigate();

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
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token);
        navigate('/');
      } else {
        toast.error(data.msg || '❌ Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error during login');
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/');
  };

  return (
    <div className="login-container">
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

        <button type="submit" className="login-button">Login</button>

        <div className="or-separator">or</div>

        <button type="button" className="demo-button" onClick={handleDemoLogin}>
          Demo Login
        </button>

        <p className="demo-caption">
          No credentials needed for demo login.
        </p>
      </form>
    </div>
  );
};

export default Login;
