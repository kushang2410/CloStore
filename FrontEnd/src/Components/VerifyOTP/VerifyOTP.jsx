import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo-5.png';
import './style.css';

const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { otp });
      setMessage(response.data);
      navigate('/change-password');
    } catch (error) {
      setMessage('Error verifying OTP');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-30">
      <form className="verifyotp-form" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="verifyotp-column">
          <label>OTP</label>
        </div>
        <div className="verifyotp-input-container mb-3">
          <input type="text" name="otp" className="verifyotp-input" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} required />
        </div>
        <button className="verifyotp-button text-center w-100 my-2" type="submit">
          Verify OTP
        </button>
        {message && <p className="mt-3 text-center verifyotp-message">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyOTP;
