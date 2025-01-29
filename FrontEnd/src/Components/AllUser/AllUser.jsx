import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const AllUser = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user || !user.token) {
                setError('User or user token is undefined');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://clostore.onrender.com/api/auth/all-users', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user]);

    const handleAction = async (action) => {
        if (!selectedUserId) return;

        try {
            let response;
            if (action === 'removeUser') {
                response = await axios.delete(`https://clostore.onrender.com/api/auth/remove-user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    data: { userId: selectedUserId },
                });
                setUsers(users.filter(u => u._id !== selectedUserId));
            } else {
                response = await axios.put(`https://clostore.onrender.com/api/auth/update-user`, {
                    userId: selectedUserId,
                    role: action === 'makeAdmin' ? 'admin' : 'user',
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUsers(users.map(u => u._id === selectedUserId ? { ...u, role: response.data.role } : u));
            }
        } catch (error) {
            setError('Error updating user role');
        } finally {
            setSelectedUserId(null);
        }
    };

    const togglePopover = (userId) => {
        setSelectedUserId(prevUserId => prevUserId === userId ? null : userId);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const nonAdminUsers = users.filter(u => u.role !== 'mainAdmin');

    return (
        <div className="container mt-9">
            <h3 className="mb-4">All Users</h3>

            {/* Desktop Table Layout */}
            <div className="d-none d-md-block">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Registration Time</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonAdminUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.registrationTime).toLocaleString('en-GB')}</td>
                                <td>{user.role}</td>
                                <td className='position-relative'>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => togglePopover(user._id)}
                                    >
                                        <i className="bi bi-gear"></i>
                                    </button>
                                    {selectedUserId === user._id && (
                                        <div style={{ position: 'absolute', zIndex: 10, right: "-130px", top: '-60px', left: '82px' }}>
                                            <div className="bg-white p-3 border rounded shadow-lg">
                                                <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('makeAdmin')}>Make Admin</button>
                                                <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('removeAdmin')}>Remove from Admin</button>
                                                <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('removeUser')}>Remove User</button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="d-md-none">
                {nonAdminUsers.map((user, index) => (
                    <div key={user._id} className="card mb-3 w-100">
                        <div className="card-body">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="card-text">
                                <strong>Email:</strong> {user.email}<br />
                                <strong>Registration Time:</strong> {new Date(user.registrationTime).toLocaleString()}<br />
                                <strong>Role:</strong> {user.role}
                            </p>
                            <div className="position-relative">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => togglePopover(user._id)}
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                {selectedUserId === user._id && (
                                    <div style={{ position: 'absolute', zIndex: 10, right: "0", top: '0' }}>
                                        <div className="bg-white p-3 border rounded shadow-lg">
                                            <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('makeAdmin')}>Make Admin</button>
                                            <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('removeAdmin')}>Remove from Admin</button>
                                            <button className="bg-transparent border-0 my-2 w-100 text-left" onClick={() => handleAction('removeUser')}>Remove User</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUser;