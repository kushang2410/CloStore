import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../Context/OrderContext';
import { IoClose } from 'react-icons/io5';
import EmptyCart from '../../assets/images/svg/cart-empty.svg';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import './style.css';

const Order = () => {
    const { orders, cancelOrder } = useContext(OrderContext);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [toastConfig, setToastConfig] = useState(null);

    const handleCancelOrder = (orderId) => {
        setToastConfig({ type: 'info', message: 'Your order has been canceled.' });
        cancelOrder(orderId);
    };

    const handleViewDetails = (order) => {
        setCurrentOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentOrder(null);
    };

    if (!orders || orders.length === 0) {
        return (
            <div className='mt-8'>
                <div className="col-12 container mt-10">
                    <h1>Your Orders</h1>
                    <div className="text-center my-10">
                        <img src={EmptyCart} alt="" />
                        <div className="fs-4 my-4">
                            No Orders. Please Go to The Store to Place an Order.
                        </div>
                        <p className="return-to-shop">
                            <Link to="/products" className="btn-custom wdt-button-2 mx-4">Return to Shop</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-8 mb-8">
            <h1 className="mb-4">Your Orders</h1>
            <div className="row">
                {orders.map(order => {
                    const orderTotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);

                    return (
                        <div key={order.orderId} className="col-49 mb-4 mx-1">
                            <div className="card w-100">
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <div>
                                        <h5>Order #{order.orderId}</h5>
                                        <button
                                            className="btn-custom bg-transparent"
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                    <div>
                                        <p>Total: ${orderTotal.toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="btn-custom wdt-button-3 py-2 px-3"
                                        onClick={() => handleCancelOrder(order.orderId)}
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.7)' }} tabIndex="-1" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details #{currentOrder?.orderId}</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <IoClose />
                                </button>
                            </div>
                            <div className="modal-body">
                                {currentOrder && (
                                    <>
                                        <h4 className='mb-4'>Order Items:</h4>
                                        <ul>
                                            {currentOrder.items.map(item => (
                                                <li key={item._id}>
                                                    {item.name} - ${item.price * item.quantity.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                        <h4 className='mt-3 mb-4'>Billing Details:</h4>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>First Name:</strong> {currentOrder.billing.firstName}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Last Name:</strong> {currentOrder.billing.lastName}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Company:</strong> {currentOrder.billing.company}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Country:</strong> {currentOrder.billing.country}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Address:</strong> {currentOrder.billing.address1}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Apartment, Suite, Unit, etc.:</strong> {currentOrder.billing.address2}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>City:</strong> {currentOrder.billing.city}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Postcode / ZIP:</strong> {currentOrder.billing.postcode}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Phone:</strong> {currentOrder.billing.phone}
                                        </p>
                                        <p className='d-flex justify-content-between align-items-center'>
                                            <strong>Email:</strong> {currentOrder.billing.email}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-custom wdt-button-3 py-2 px-3" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {toastConfig && (
                <SnackbarNotification
                    type={toastConfig.type}
                    message={toastConfig.message}
                    onClose={() => setToastConfig(null)}
                />
            )}
        </div>
    );
};

export default Order;