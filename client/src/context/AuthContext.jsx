import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Use environment variable for the backend URL
//const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const response = await axios.post(`https://bcknddd.vercel.app/api/auth/login`, {
        email,
        password,
      });

      const { token, id, role } = response.data;
      
      setUser({ id, role });
      setToken(token);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, role }));
      
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data?.msg || error.message);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post(`https://bcknddd.vercel.app/api/auth/signup`, {
        name,
        email,
        password,
        role,
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.msg || error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Axios interceptor for adding token to requests
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
