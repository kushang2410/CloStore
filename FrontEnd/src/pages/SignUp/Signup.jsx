import React, { useEffect, useState } from 'react';
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

  const [selectedFile, setSelectedFile] = useState("Choose Profile");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : "Choose Profile");
    setFormData({ ...formData, profilePicture: file });
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
      <form className="signin-form position-relative" onSubmit={handleSubmit}>
        <button type="button" className="btn border-0 position-absolute end-0 me-4"
          data-bs-toggle="tooltip" data-bs-placement="top"
          data-bs-custom-class="custom-tooltip"
          data-bs-title="The website server is currently Free version. The Signup/Google Authentication process may take longer than usual. Please be patient or try again if the process does not complete.">
          <i className="bi bi-info-circle fs-5" style={{ color: "#7d645a" }}></i>
        </button>
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
            <div className="signin-input-container mb-3 position-relative">
              <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              <label htmlFor="profilePicture" className="text-secondary ms-3 mt-1 border-0">{selectedFile}</label>
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
            <img src={Google} alt="Google Logo" height="25" className='me-4' />
            Continue with Google
          </button>
        </div>
      </form>
      {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
    </div>
  );
};

export default Signup;