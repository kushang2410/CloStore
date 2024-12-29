import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo-5.png';
import './style.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data);
      localStorage.setItem('resetEmail', email);
      navigate('/verify-otp');
    } catch (error) {
      setMessage('Error sending reset email');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-30">
      <form className="forgotpass-form" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="forgotpass-column">
          <label>Email</label>
        </div>
        <div className="forgotpass-input-container mb-3">
          @ <input type="email" name="email" className="forgotpass-input" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="forgotpass-button text-center w-100 my-2" type="submit">
          Send Reset Email
        </button>
        {message && <p className="mt-3 text-center forgotpass-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
