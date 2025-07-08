import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo-5.png';
import './style.css';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('resetEmail');
      const payLoad = { email, newPassword };
      console.log('Payload:', payLoad);
      const response = await axios.post('https://clostore1.onrender.com/api/auth/change-password', payLoad);
      setMessage(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Password Change Error:', error.response ? error.response.data : error.message);
      setMessage('Error changing password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-30">
      <form className="changepassword-form" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="changepassword-column">
          <label htmlFor="newPassword">New Password</label>
        </div>
        <div className="changepassword-input-container mb-3">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="changepassword-input"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="changepassword-button text-center w-100 my-2" type="submit">
          Change Password
        </button>
        {message && <p className="mt-3 text-center changepassword-message">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
