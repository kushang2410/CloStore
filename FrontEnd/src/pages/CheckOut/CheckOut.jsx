import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { OrderContext } from '../../Context/OrderContext';
import PayPal from '../../assets/images/logo/paypal.png';
import countries from 'country-list';

const CheckOut = () => {
    const { cart } = useCart();
    const { placeOrder } = useContext(OrderContext);
    const [shippingMethod, setShippingMethod] = useState('flat_rate:1');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'billing_first_name', 'billing_last_name', 'billing_country', 'billing_address_1', 'billing_city', 'billing_phone', 'billing_email'
        ];

        requiredFields.forEach(field => {
            if (!document.getElementById(field).value.trim()) {
                newErrors[field] = 'This field is required';
            }
        });

        if (!termsAccepted) {
            newErrors['terms'] = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const orderDetails = {
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal: getSubtotal(),
                shippingCost: getShippingCost(),
                total: getTotal(),
                billing: {
                    firstName: document.getElementById('billing_first_name').value,
                    lastName: document.getElementById('billing_last_name').value,
                    company: document.getElementById('billing_company').value,
                    country: document.getElementById('billing_country').value,
                    address1: document.getElementById('billing_address_1').value,
                    address2: document.getElementById('billing_address_2').value,
                    city: document.getElementById('billing_city').value,
                    postcode: document.getElementById('billing_postcode').value,
                    phone: document.getElementById('billing_phone').value,
                    email: document.getElementById('billing_email').value
                },
                orderNotes: document.getElementById('order_comments').value
            };

            placeOrder(orderDetails);
            navigate('/order');
        }
    };

    return (
        <div id="main" className="container mt-8">
            <div className="col-12">
                <h1>Checkout</h1>
            </div>
            <div className="row mt-3">
                <div id="main-content" className="col-12">
                    <div id="primary" className="col-12">
                        <article id="post-8" className="col-12">
                            <div className="col-12">
                                <div className="container mt-5 my-10">
                                    <div className="row">
                                        <div className="col-12 col-xl-7">
                                            <div className="row" id="customer_details">
                                                <div className="mb-3">
                                                    <h3>Billing details</h3>
                                                    <div className="form-row d-block">
                                                        <p className="form-group" id="billing_first_name_field">
                                                            <label htmlFor="billing_first_name">First name&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_first_name" id="billing_first_name" placeholder="" autoComplete="given-name" />
                                                            </span>
                                                            {errors.billing_first_name && <span className="text-danger">{errors.billing_first_name}</span>}
                                                        </p>
                                                        <p className="form-group" id="billing_last_name_field">
                                                            <label htmlFor="billing_last_name">Last name&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_last_name" id="billing_last_name" placeholder="" autoComplete="family-name" />
                                                            </span>
                                                            {errors.billing_last_name && <span className="text-danger">{errors.billing_last_name}</span>}
                                                        </p>
                                                        <p className="form-group col-12" id="billing_company_field">
                                                            <label htmlFor="billing_company">Company name&nbsp;<span className="text-muted">(optional)</span></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_company" id="billing_company" placeholder="" autoComplete="organization" />
                                                            </span>
                                                        </p>
                                                        <p className="form-group col-12" id="billing_country_field">
                                                            <label htmlFor="billing_country">Country / Region&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <select name="billing_country" id="billing_country" className="form-control" autoComplete="country" data-placeholder="Select a country / region…" data-label="Country / Region">
                                                                    <option disabled>Select a country / region…</option>
                                                                    {countries.getNames().map((country, index) => (
                                                                        <option key={index} value={country}>{country}</option>
                                                                    ))}
                                                                </select>
                                                            </span>
                                                            {errors.billing_country && <span className="text-danger">{errors.billing_country}</span>}
                                                        </p>
                                                        <p className="form-group col-12" id="billing_address_1_field">
                                                            <label htmlFor="billing_address_1">Street address&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_address_1" id="billing_address_1" placeholder="House number and street name" autoComplete="address-line1" data-placeholder="House number and street name" />
                                                            </span>
                                                            {errors.billing_address_1 && <span className="text-danger">{errors.billing_address_1}</span>}
                                                        </p>
                                                        <p className="form-group col-12" id="billing_address_2_field">
                                                            <label htmlFor="billing_address_2" className="sr-only">Apartment, suite, unit, etc.&nbsp;<span className="text-muted">(optional)</span></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_address_2" id="billing_address_2" placeholder="Apartment, suite, unit, etc. (optional)" autoComplete="address-line2" data-placeholder="Apartment, suite, unit, etc. (optional)" />
                                                            </span>
                                                        </p>
                                                        <p className="form-group" id="billing_postcode_field">
                                                            <label htmlFor="billing_postcode">Postcode / ZIP&nbsp;<span className="text-muted">(optional)</span></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_postcode" id="billing_postcode" placeholder="" autoComplete="postal-code" />
                                                            </span>
                                                        </p>
                                                        <p className="form-group" id="billing_city_field">
                                                            <label htmlFor="billing_city">Town / City&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="text" className="form-control" name="billing_city" id="billing_city" placeholder="" autoComplete="address-level2" />
                                                            </span>
                                                            {errors.billing_city && <span className="text-danger">{errors.billing_city}</span>}
                                                        </p>
                                                        <p className="form-group col-12" id="billing_state_field" style={{ display: 'none' }}>
                                                            <label htmlFor="billing_state">State / County&nbsp;<span className="text-muted">(optional)</span></label>
                                                            <span className="d-flex">
                                                                <input type="hidden" id="billing_state" name="billing_state" placeholder="" className="form-control" />
                                                            </span>
                                                        </p>
                                                        <p className="form-group" id="billing_phone_field">
                                                            <label htmlFor="billing_phone">Phone&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="tel" className="form-control" name="billing_phone" id="billing_phone" placeholder="" autoComplete="tel" />
                                                            </span>
                                                            {errors.billing_phone && <span className="text-danger">{errors.billing_phone}</span>}
                                                        </p>
                                                        <p className="form-group" id="billing_email_field">
                                                            <label htmlFor="billing_email">Email address&nbsp;<abbr className="text-danger" title="required">*</abbr></label>
                                                            <span className="d-flex">
                                                                <input type="email" className="form-control" name="billing_email" id="billing_email" placeholder="" autoComplete="email" />
                                                            </span>
                                                            {errors.billing_email && <span className="text-danger">{errors.billing_email}</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-row">
                                                        <p className="form-group col-12" id="order_comments_field">
                                                            <label htmlFor="order_comments">Order notes&nbsp;<span className="text-muted">(optional)</span></label>
                                                            <span className="d-flex">
                                                                <textarea name="order_comments" className="form-control" id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5"></textarea>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-5">
                                            <h3 id="order_review_heading">Your order</h3>
                                            <div id="order_review" className="col-12 border border-2 p-4">
                                                <div className="col-12 p-0">
                                                    <div className="alert p-0">
                                                        Have a coupon?
                                                        <a href="#" className="alert-link" data-bs-toggle="collapse" data-bs-target="#couponCollapse"
                                                            aria-expanded="false" aria-controls="couponCollapse"> Click here to enter your code</a>
                                                        <div className="collapse" id="couponCollapse">
                                                            <div className="d-flex justify-content-between align-items-center mt-4">
                                                                <input type="text" className="form-control w-65" value={couponCode}
                                                                    onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" />
                                                                <button type="submit" className="btn-custom wdt-button-3 d-flex align-items-center px-3" style={{ height: "40px" }} name="" value="Apply coupon">Apply coupon</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Desktop View (Table Layout) */}
                                                <div className="d-none d-md-block">
                                                    <table className="table table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th className="w-50">Product</th>
                                                                <th className="w-50">Subtotal</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cart.map((item) => (
                                                                <tr key={item._id}>
                                                                    <td>
                                                                        {item.name}&nbsp; <strong className="text-muted">×&nbsp;{item.quantity}</strong>
                                                                    </td>
                                                                    <td>
                                                                        <span className="font-weight-bold">
                                                                            <span className="text-muted">₹</span>{(item.price * item.quantity).toFixed(2)}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th>Subtotal</th>
                                                                <td>
                                                                    <span className="font-weight-bold">
                                                                        <span className="text-muted">₹</span>{getSubtotal().toFixed(2)}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Shipping</th>
                                                                <td data-title="Shipping">
                                                                    <ul id="shipping_method" className="list-unstyled">
                                                                        <li>
                                                                            <input type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_flat_rate1" value="flat_rate:1"
                                                                                className="custom-radio" checked={shippingMethod === 'flat_rate:1'} onChange={() => setShippingMethod('flat_rate:1')} />
                                                                            <label htmlFor="shipping_method_0_flat_rate1" className="form-check-label">Flat rate: <span className="text-muted">
                                                                                <span className="text-muted">₹</span>59.00 </span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_local_pickup2" value="local_pickup:2"
                                                                                className="custom-radio" checked={shippingMethod === 'local_pickup:2'} onChange={() => setShippingMethod('local_pickup:2')} />
                                                                            <label htmlFor="shipping_method_0_local_pickup2" className="form-check-label">Local pickup: <span className="text-muted">
                                                                                <span className="text-muted">₹</span>29.00 </span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio" className='custom-radio' data-index="0" value="free_shipping:3"
                                                                                checked={shippingMethod === 'free_shipping:3'} onChange={() => setShippingMethod('free_shipping:3')} />
                                                                            <label className='ms-2'>Free shipping</label>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Total</th>
                                                                <td>
                                                                    <strong><span className="font-weight-bold"><span className="text-muted">₹</span>{getTotal().toFixed(2)}
                                                                    </span></strong>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                                {/* Mobile View (Card Layout) */}
                                                <div className="d-md-none">
                                                    <div className="row g-4">
                                                        {cart.map((item) => (
                                                            <div className="col-12 p-0" key={item._id}>
                                                                <div className="card w-100 border-0">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{item.name}</h5>
                                                                        <p className="card-text">
                                                                            Quantity: <strong>{item.quantity}</strong>
                                                                        </p>
                                                                        <p className="card-text">
                                                                            Subtotal: <span className="font-weight-bold"><span className="text-muted">₹</span>{(item.price * item.quantity).toFixed(2)}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <div>
                                                            <h6 className='mt-4'>Shipping</h6>
                                                            <ul className="list-unstyled">
                                                                <li>
                                                                    <input type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_flat_rate1_mobile" value="flat_rate:1"
                                                                        className="custom-radio" checked={shippingMethod === 'flat_rate:1'} onChange={() => setShippingMethod('flat_rate:1')} />
                                                                    <label htmlFor="shipping_method_0_flat_rate1_mobile" className="form-check-label">Flat rate: <span className="text-muted">
                                                                        <span className="text-muted">₹</span>59.00 </span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_local_pickup2_mobile" value="local_pickup:2"
                                                                        className="custom-radio" checked={shippingMethod === 'local_pickup:2'} onChange={() => setShippingMethod('local_pickup:2')} />
                                                                    <label htmlFor="shipping_method_0_local_pickup2_mobile" className="form-check-label">Local pickup: <span className="text-muted">
                                                                        <span className="text-muted">₹</span>29.00 </span>
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio" className='custom-radio' data-index="0" value="free_shipping:3"
                                                                        checked={shippingMethod === 'free_shipping:3'} onChange={() => setShippingMethod('free_shipping:3')} />
                                                                    <label className='ms-2'>Free shipping</label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <h5>Total: <strong><span className="font-weight-bold"><span className="text-muted">$</span>{getTotal().toFixed(2)}</span></strong></h5>
                                                    </div>
                                                </div>
                                                <div id="payment" className="col-12 p-0 mt-4">
                                                    <ul className="list-unstyled">
                                                        <li className="form-check">
                                                            <input id="payment_method_cheque" type="radio" className="custom-radio" name="payment_method" value="cheque" checked data-order_button_text="" />
                                                            <label htmlFor="payment_method_cheque" className="form-check-label">Check payments</label>
                                                            <div className="form-check-description ms-4 mt-2">
                                                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                                            </div>
                                                        </li>
                                                        <li className="form-check">
                                                            <input id="payment_method_cod" type="radio" className="custom-radio" name="payment_method" value="cod" data-order_button_text="" />
                                                            <label htmlFor="payment_method_cod" className="form-check-label">Cash on delivery</label>
                                                        </li>
                                                        <li className="form-check">
                                                            <input id="payment_method_paypal" type="radio" className="custom-radio" name="payment_method" value="paypal" data-order_button_text="Proceed to PayPal" />
                                                            <label htmlFor="payment_method_paypal" className="form-check-label">
                                                                PayPal <img src={PayPal} alt="PayPal acceptance mark" width="50px" height="30px" className='ms-2' />
                                                            </label>
                                                        </li>
                                                    </ul>
                                                    <label className="form-check-label my-3">
                                                        <input type="checkbox" className="custom-checkbox" name="terms"
                                                            id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                                                        <span className="text-muted">I agree with the terms and conditions</span>&nbsp;<abbr className="text-danger" title="required">*</abbr>
                                                    </label>
                                                    {errors.terms && <span className="d-grid text-danger">{errors.terms}</span>}
                                                    <button type="submit" className="text-center mt-3 btn-custom wdt-button-3 py-2 px-5 rounded-5 fs-5" id="place_order" value="Place order" data-value="Place order" onClick={handleSubmit}>Place order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;