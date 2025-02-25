import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import { signInWithGoogle } from '../../Firebase/firebaseConfig';
import logo from '../../assets/images/logo/logo-5.png';
import Google from '../../assets/images/svg/google.svg';
import axios from 'axios';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import './style.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, googleSignup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profilePicture: null,
  });
  const [toastConfig, setToastConfig] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('profilePicture', formData.profilePicture);

    try {
      const response = await axios.post('https://clostore.onrender.com/api/auth/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { token } = response.data;
      await signup(formData, token);
      setToastConfig({ type: 'success', message: 'Signup successful! Redirecting to login...' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setToastConfig({ type: 'error', message: error.response?.data?.message || 'Signup failed. Please try again.' });
      console.error("Signup failed", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { idToken, user, token } = await signInWithGoogle();
      const response = await axios.post('https://clostore.onrender.com/api/auth/google-auth', { idToken });

      if (response.data.success) {
        localStorage.setItem('token', token);
        googleSignup(response.data.user, token);
        setToastConfig({ type: 'success', message: 'Signup successful! Redirecting to home...' });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setToastConfig({ type: 'error', message: response.data.message });
      }
    } catch (error) {
      setToastConfig({ type: 'error', message: 'Google Signup failed. Please try again.' });
      console.error('Google Signup failed:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setToastConfig(null);
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-10'>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="signin-column">
              <label>Username</label>
            </div>
            <div className="signin-input-container mb-3">
              <IoPersonOutline />
              <input type="text" name="username" className="signin-input" placeholder="Enter your Username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="signin-column">
              <label>Email</label>
            </div>
            <div className="signin-input-container mb-3">
              @ <input type="email" name="email" className="signin-input" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="signin-column">
              <label>Password</label>
            </div>
            <div className="signin-input-container mb-3">
              <IoLockClosedOutline />
              <input type="password" name="password" className="signin-input" placeholder="Enter your Password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="signin-column">
              <label>Phone</label>
            </div>
            <div className="signin-input-container mb-3">
              <input type="text" name="phone" className="signin-input" placeholder="Enter your Phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="signin-column">
              <label>Address</label>
            </div>
            <div className="signin-input-container mb-3">
              <input type="text" name="address" className="signin-input" placeholder="Enter your Address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="signin-column">
              <label>Profile Picture</label>
            </div>
            <div className="signin-input-container mb-3">
              <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} required />
            </div>
          </div>
        </div>
        <button className="signin-button text-center w-100 my-2 fw-bold" type="submit">
          Signup
        </button>
        <p className="signin-text text-center">
          Already have an account? <Link to="/login" className="signin-link text-black">Login</Link>
        </p>
        <p className="signin-or-text">Or</p>
        <div className="signin-row">
          <button onClick={handleGoogleSignIn} className="signin-btn-google">
            <img src={Google} alt="Logo" height="25" className='me-4' />
            Continue with Google
          </button>
        </div>
      </form>
      {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
    </div>
  );
};

export default Signup;