import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { IoLockClosedOutline } from "react-icons/io5";
import logo from '../../assets/images/logo/logo-5.png';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [toastConfig, setToastConfig] = useState(null);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const success = await login(formData);
      if (success) {
        setToastConfig({ type: 'success', message: 'Login successful!' });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setToastConfig({ type: 'error', message: 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      setToastConfig({ type: 'error', message: error.message || 'An error occurred. Please try again.' });
      console.error('Login Error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCloseSnackbar = () => {
    setToastConfig(null);
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-10'>
      {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
      <form className="login-form position-relative" onSubmit={handleSubmit}>
        <button type="button" class="btn border-0 position-absolute end-0 me-4"
          data-bs-toggle="tooltip" data-bs-placement="top"
          data-bs-custom-class="custom-tooltip"
          data-bs-title="The website server is currently Free version. The login process may take longer than usual. Please be patient or try again if the process does not complete.">
          <i class="bi bi-info-circle fs-5" style={{color: "#7d645a"}}></i>
        </button>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="login-column">
          <label>Email</label>
        </div>
        <div className="login-input-container mb-3">
          @ <input type="email" name="email" className="login-input" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="login-column">
          <label>Password</label>
        </div>
        <div className="login-input-container mb-3">
          <IoLockClosedOutline />
          <input type="password" name="password" className="login-input" placeholder="Enter your Password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="login-button text-center w-100 my-2 fw-bold" type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        <div className="row text-center">
          <Link className='login-link my-2 text-black' to="/forgot-password">Forgot password?</Link>
          <Link className='login-link my-3 text-black' to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;