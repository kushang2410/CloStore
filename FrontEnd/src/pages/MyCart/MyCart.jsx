import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import EmptyCart from '../../assets/images/svg/cart-empty.svg';
import './style.css';

const MyCart = () => {
    const { cart, removeFromCart, updateCartItemQuantity, emptyCart } = useCart();
    const [quantities, setQuantities] = useState({});
    const [shippingMethod, setShippingMethod] = useState('flat_rate:1');

    useEffect(() => {
        const initialQuantities = cart.reduce((acc, item) => {
            acc[item._id] = item.quantity;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cart]);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemId);
        } else {
            setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * (quantities[item._id] || 1), 0);
    };

    const getShippingCost = () => {
        switch (shippingMethod) {
            case 'flat_rate:1':
                return 59;
            case 'local_pickup:2':
                return 29;
            case 'free_shipping:3':
                return 0;
            default:
                return 0;
        }
    };

    const getTotal = () => {
        return getSubtotal() + getShippingCost();
    };

    const handleEmptyCart = () => {
        emptyCart();
    };

    if (cart.length === 0) {
        return (
            <div className="container mt-10">
                <h1>My Cart</h1>
                <div className="text-center my-10">
                    <img src={EmptyCart} alt="Empty Cart" className="img-fluid" />
                    <div className="fs-4 my-4">
                        Your cart is currently empty.
                    </div>
                    <p className="return-to-shop">
                        <Link to="/products" className="btn-custom wdt-button-2 mx-4">Return to shop</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-8">
            <div className="container">
                <h1>My Cart</h1>
                <div className="row">
                    <div className="col-12 col-xl-8">
                        {/* Desktop View (Table Layout) */}
                        <div className="d-none d-md-block">
                            <form method="post">
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th className="product-remove"></th>
                                                <th className="product-thumbnail">Image</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => {
                                                const imageUrl = `https://clostore.onrender.com/${item.image.replace(/\\/g, '/')}`;
                                                return (
                                                    <tr key={item._id}>
                                                        <td className='total'>
                                                            <button className="btn cart-align fs-1" onClick={() => removeFromCart(item._id)} aria-label={`Remove ${item.name} from cart`}>×</button>
                                                        </td>
                                                        <td className='total'>
                                                            <img src={imageUrl} alt={item.name} className="img-fluid" style={{ width: '100px' }} />
                                                        </td>
                                                        <td className='total cart-align' data-title="Product">
                                                            {item.name}
                                                        </td>
                                                        <td className='total' data-title="Price">
                                                            <span className="cart-align"><span>$</span>{item.price}</span>
                                                        </td>
                                                        <td className='total' data-title="Quantity">
                                                            <div className="input-group cart-align border border-1 rounded-5">
                                                                <button type="button" className="btn btn-outline-secondary border border-0" onClick={() => handleQuantityChange(item._id, Math.max(0, (quantities[item._id] || 1) - 1))}>-</button>
                                                                <input type="number" className="form-control border border-0" value={quantities[item._id] || 1} min="1" max="10" step="1" onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))} />
                                                                <button type="button" className="btn btn-outline-secondary border border-0" onClick={() => handleQuantityChange(item._id, Math.min(10, (quantities[item._id] || 1) + 1))}>+</button>
                                                            </div>
                                                        </td>
                                                        <td className='total' data-title="Subtotal">
                                                            <span className="cart-align"><span>$</span>{(item.price * (quantities[item._id] || 1)).toFixed(2)}</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan="6">
                                                    <div className="lh-xxl">
                                                        <label htmlFor="coupon_code" className="screen-reader-text">Coupon:</label>
                                                        <input type="text" className="form-control" value="" placeholder="Coupon code" />
                                                        <button type="submit" className="btn-custom wdt-button-3 d-flex align-items-center mt-3 px-3" style={{ height: "40px" }} name="" value="Apply coupon">Apply coupon</button>
                                                    </div>
                                                    <div className='text-end'>
                                                        <button type="submit" className="btn-custom wdt-button-3 py-2 px-3 ms-3" value="Empty cart" onClick={handleEmptyCart}>Empty cart</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>

                        {/* Mobile View (Card Layout) */}
                        <div className="d-md-none">
                            <div className="row g-4">
                                {cart.map((item) => {
                                    const imageUrl = `https://clostore.onrender.com/${item.image.replace(/\\/g, '/')}`;
                                    return (
                                        <div className="col-12" key={item._id}>
                                            <div className="card shadow-sm w-100">
                                                <div className="card-body d-sm-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn fs-4 me-3"
                                                            onClick={() => removeFromCart(item._id)}
                                                        >
                                                            ×
                                                        </button>
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.name}
                                                            className="img-fluid"
                                                            style={{ width: "100px", height: "140px", objectFit: "cover" }}
                                                        />
                                                        <div className="ms-3">
                                                            <h5 className="card-title mb-1">{item.name}</h5>
                                                            <p className="card-text mb-1">${item.price}</p>
                                                            <div className="input-group border border-1 rounded-5 mt-3">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary border border-0"
                                                                    onClick={() => handleQuantityChange(item._id, Math.max(0, (quantities[item._id] || 1) - 1))}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    className="form-control border border-0"
                                                                    value={quantities[item._id] || 1}
                                                                    min="1"
                                                                    max="10"
                                                                    step="1"
                                                                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary border border-0"
                                                                    onClick={() => handleQuantityChange(item._id, Math.min(10, (quantities[item._id] || 1) + 1))}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <p className="d-md-none d-sm-block card-text mb-0 mt-4">
                                                                Subtotal: <span className="fw-bold">${(item.price * (quantities[item._id] || 1)).toFixed(2)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="d-xsm-none d-md-block card-text mb-0">
                                                            Subtotal: <span className="fw-bold">${(item.price * (quantities[item._id] || 1)).toFixed(2)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4">
                                <div className="lh-xxl">
                                    <label htmlFor="coupon_code" className="screen-reader-text">Coupon:</label>
                                    <input type="text" className="form-control" value="" placeholder="Coupon code" />
                                    <button type="submit" className="btn-custom wdt-button-3 d-flex align-items-center mt-3 px-3" style={{ height: "40px" }} name="" value="Apply coupon">Apply coupon</button>
                                </div>
                                <div className='text-end my-4'>
                                    <button type="submit" className="btn-custom wdt-button-3 py-2 px-3 ms-3" value="Empty cart" onClick={handleEmptyCart}>Empty cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="cart-collaterals">
                            <div className="cart_totals">
                                <div className="card w-100 border-1 p-4 lh-lg">
                                    <div className="card-body">
                                        <div className="row">
                                            <h2 className='mb-3'>Cart totals</h2>
                                            <div className="col-4">
                                                <strong>Subtotal</strong>
                                            </div>
                                            <div className="col-8 text-end">
                                                <span className="amount"><span>$</span>{getSubtotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-4">
                                                <strong>Shipping</strong>
                                            </div>
                                            <div className="col-8">
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <input type="radio" className='custom-radio' data-index="0" value="flat_rate:1" checked={shippingMethod === 'flat_rate:1'}
                                                            onChange={() => setShippingMethod('flat_rate:1')} />
                                                        <label className='ms-2'>Flat rate: <span className="amount"><span>$</span>59.00</span></label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" className='custom-radio' data-index="0" value="local_pickup:2" checked={shippingMethod === 'local_pickup:2'}
                                                            onChange={() => setShippingMethod('local_pickup:2')} />
                                                        <label className='ms-2'>Local pickup: <span className="amount"><span>$</span>29.00</span></label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" className='custom-radio' data-index="0" value="free_shipping:3" checked={shippingMethod === 'free_shipping:3'}
                                                            onChange={() => setShippingMethod('free_shipping:3')} />
                                                        <label className='ms-2'>Free shipping</label>
                                                    </li>
                                                </ul>
                                                <p className="destination fs-6">
                                                    Shipping options will be updated during checkout.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-4">
                                                <strong>Total</strong>
                                            </div>
                                            <div className="col-8 text-end">
                                                <strong><span className="amount"><span>$</span>{getTotal().toFixed(2)}</span></strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link to="/checkout" className="btn-custom wdt-button-3 py-2 px-5 rounded-5 fs-5">
                                            Proceed to checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;