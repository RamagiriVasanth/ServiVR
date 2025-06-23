import React, { createContext, useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logoutTimer = useRef(null);

  const logout = (showToast = false) => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);

    if (showToast && user) {
      toast.info(`👋 Goodbye, ${user.name || 'User'}! You have logged out.`, {
        icon: '👋',
      });
    }
  };

  const setLogoutTimer = (exp) => {
    const expirationTime = exp * 1000;
    const currentTime = Date.now();
    const timeout = expirationTime - currentTime;

    if (timeout > 0) {
      logoutTimer.current = setTimeout(() => logout(true), timeout);
    } else {
      logout(true);
    }
  };

  const decodeAndSetUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('✅ Decoded token:', decoded);

      const userId = decoded.id || decoded._id || decoded.userId;
      const name = decoded.name || 'User';

      setUser({ email: decoded.email, name, _id: userId });
      setLogoutTimer(decoded.exp);
      setToken(token);

      toast.success(`✅ Logged in as ${name}`, { icon: '✅' });
    } catch (err) {
      console.error('❌ Invalid token:', err);
      toast.error('❌ Invalid token, please login again.');
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    decodeAndSetUser(token);
  };

  // ✅ Use backend demo route instead of fake token
  const demoLogin = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/demo-login`, {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token); // Use real token from backend
      } else {
        toast.error(data.msg || '❌ Demo login failed');
      }
    } catch (err) {
      console.error('❌ Demo login error:', err);
      toast.error('❌ Could not perform demo login');
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) decodeAndSetUser(savedToken);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
