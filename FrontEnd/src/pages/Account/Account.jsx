import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import EmptyCart from '../../assets/images/svg/cart-empty.svg'

const Account = () => {
    const { user, logout, setUser } = useAuth();
    const [toastConfig, setToastConfig] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        address: user ? user.address : '',
    });
    const [lastUpdated, setLastUpdated] = useState(user ? user.lastUpdated : '');
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });
            setLastUpdated(user.lastUpdated);
            handleFetchAllUsers();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        setToastConfig({ type: 'success', message: 'Logged out successfully!' });
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const response = await axios.post('https://clostore1.onrender.com/api/auth/update-profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (response.data && response.data.profilePicture) {
                setUser({
                    ...user,
                    profilePicture: response.data.profilePicture,
                    lastUpdated: new Date().toISOString()
                });
                localStorage.setItem('user', JSON.stringify({ ...user, lastUpdated: new Date().toISOString() }));
                setToastConfig({ type: 'success', message: 'Profile picture updated successfully!' });
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
            setToastConfig({ type: 'error', message: error.response?.data?.msg || 'Failed to update profile picture.' });
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUserData({
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });
    };

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('https://clostore1.onrender.com/api/auth/update-user', {
                userId: user._id,
                ...userData,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setUser({ ...user, ...response.data, lastUpdated: new Date().toISOString() });
            localStorage.setItem('user', JSON.stringify({ ...user, ...response.data, lastUpdated: new Date().toISOString() }));
            setLastUpdated(new Date().toISOString());
            setIsEditing(false);
            setToastConfig({ type: 'success', message: 'Profile updated successfully!' });
        } catch (error) {
            console.error('Error updating profile:', error);
            setToastConfig({ type: 'error', message: 'Failed to update profile.' });
        }
    };

    const handleFetchAllUsers = async () => {
        if (!user || !user.token) {
            console.error('User or token is not available');
            return;
        }

        try {
            const response = await axios.get('https://clostore1.onrender.com/api/auth/all-users', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setAllUsers(response.data);
        } catch (error) {
            console.error('Error fetching all users:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setToastConfig(null);
    };

    return (
        <div className="container mt-8 mb-10">
            <h1>Account</h1>
            {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
            {!user ? (
                <div className="col-12 container mt-10">
                    <div className="text-center my-10">
                        <img src={EmptyCart} alt="" />
                        <div className="fs-4 my-4">
                            You Need To Login First To See The Account Details
                        </div>
                        <p className="return-to-shop">
                            <Link to="/login" className="btn-custom wdt-button-2 mx-4">Go To Login</Link>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <div className="col-sm-12 col-xl-5">
                                <div className="bg-white p-4 mb-4 shadow-sm rounded">
                                    <div className="d-flex flex-column align-items-center">
                                        <img src={user ? user.profilePicture.startsWith('http')
                                            ? user.profilePicture : `https://clostore.onrender.com${user.profilePicture}` : 'https://via.placeholder.com/100'}
                                            alt="User" className="rounded-circle mb-3"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #007bff', }} />
                                        {isEditing ? (
                                            <input type="file" accept="image/*" onChange={handleProfilePictureChange}
                                                className="form-control form-control-sm w-50 mt-2" />
                                        ) : (
                                            <i className="fas fa-pencil-alt" onClick={handleEditClick} style={{ cursor: 'pointer' }}></i>
                                        )}
                                    </div>
                                    <div className="text-center mt-3">
                                        <h4 className="fw-bold">{user ? user.username : 'Loading...'}</h4>
                                        <p className="text-muted">{user ? user.email : 'Loading email...'}</p>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        {isEditing ? (
                                            <>
                                                <button className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 flex-fill"
                                                    onClick={handleCancelClick}> Cancel </button>
                                                <button className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 flex-fill"
                                                    onClick={handleSubmit}>Save </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 flex-fill"
                                                    onClick={handleEditClick}> Edit Account </button>
                                                <button className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 flex-fill"
                                                    onClick={handleLogout}> Logout </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-xl-7">
                                <div className="bg-white p-4 mb-4 shadow-sm rounded">
                                    <h5 className="mb-3">Account Information</h5>
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3">
                                                    <strong>Username:</strong>
                                                    <input type="text" name="username" value={userData.username}
                                                        onChange={handleInputChange} className="form-control" />
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <strong>Phone:</strong>
                                                    <input type="text" name="phone" value={userData.phone}
                                                        onChange={handleInputChange} className="form-control" />
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <strong>Address:</strong>
                                                    <input type="text" name="address" value={userData.address}
                                                        onChange={handleInputChange} className="form-control" />
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="row">
                                            <div className="col-12 col-md-6 mb-3">
                                                <strong>Username:</strong>
                                                <p>{user ? user.username : 'Not provided'}</p>
                                            </div>
                                            <div className="col-12 col-md-6 mb-3">
                                                <strong>Phone:</strong>
                                                <p>{user ? user.phone : 'Not provided'}</p>
                                            </div>
                                            <div className="col-12 col-md-6 mb-3">
                                                <strong>Address:</strong>
                                                <p>{user ? user.address : 'Not provided'}</p>
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-muted small">Last updated: {lastUpdated}</p>
                                </div>
                                {user && (user.role === 'admin' || user.role === 'mainAdmin') && (
                                    <div className="bg-white p-4 mb-4 shadow-sm rounded">
                                        <h5 className="mb-3">Admin Actions</h5>
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <Link to="/productview" className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 text-center flex-fill">
                                                View All Products
                                            </Link>
                                            <Link to="/productform" className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 text-center flex-fill">
                                                Add Product
                                            </Link>
                                            {user.role === 'mainAdmin' && (
                                                <Link to="/alluser" className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 text-center flex-fill" onClick={handleFetchAllUsers}>
                                                    View All Users
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="bg-white p-4 mb-4 shadow-sm rounded">
                                    <h5 className="mb-3">Your Orders</h5>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <Link to="/order" className="custom-btn wdt-button-3 py-2 fs-6 rounded-2 text-center flex-fill">
                                            View Your Orders
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;