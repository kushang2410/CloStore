import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  const storedUser = localStorage.getItem('token');

  if (!storedUser) {
    return <Navigate to="/login"  replace/>;
  }

  return children;
};

export default ProtectedRoute;