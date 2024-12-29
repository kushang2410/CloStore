import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userDetails = localStorage.getItem(`user:${token}`);
        if (userDetails) {
          setUser({ ...JSON.parse(userDetails), token });
        } else {
          try {
            const response = await axios.get('http://localhost:5000/api/auth/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.data) {
              setUser({ ...response.data, token });
              localStorage.setItem(`user:${token}`, JSON.stringify(response.data));
            }
          } catch (error) {
            console.error('Failed to fetch user details:', error);
            localStorage.removeItem('token');
          }
        }
      }
    };

    initializeAuth();
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setUser({ ...response.data, token });
        localStorage.setItem(`user:${token}`, JSON.stringify(response.data));
        setError(null);
      }
    } catch (error) {
      console.error('Fetch User Details Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'Failed to fetch user details.');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserDetails(token);
      return true;
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login Error:', error);
      return false;
    }
  };

  const signup = async (formData, token = null) => {
    if (token && formData) {
      setUser(formData);
      localStorage.setItem('token', token);
      localStorage.setItem(`user:${token}`, JSON.stringify(formData));
      return true;
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        await fetchUserDetails(token);
        return true;
      } catch (error) {
        setError('Signup failed. Please try again.');
        console.error('Signup Error:', error);
        return false;
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem(`user:${localStorage.getItem('token')}`);
  };

  const googleSignup = async (user, token) => {
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem(`user:${token}`, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout, setUser, googleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};