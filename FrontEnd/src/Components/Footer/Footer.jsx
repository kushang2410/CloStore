import React from 'react';
import { Link } from 'react-router-dom';
import { LiaFacebookF } from "react-icons/lia";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoPinterest } from "react-icons/io";
import logo from "../../assets/images/logo/logo-4.png";
import PaymentLogo1 from "../../assets/images/svg/paypal.svg";
import PaymentLogo2 from "../../assets/images/svg/mastercard.svg";
import PaymentLogo3 from "../../assets/images/svg/visa.svg";
import PaymentLogo4 from "../../assets/images/svg/american-express.svg";
import './style.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-middle container py-5">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
                        {/* Store Info Column */}
                        <div className="footer-column footer-store-info col mb-4">
                            <div className="logo fw-bold mb-3">
                                <Link to="/">
                                    <img src={logo} width="200px" alt="Logo" />
                                </Link>
                            </div>
                            <p className="footer-address">
                                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                            </p>
                            <p className="m-0">
                                <strong className="fw-medium fs-6">sale@uomo.com</strong>
                            </p>
                            <p>
                                <strong className="fw-medium fs-6">+1 246-345-0695</strong>
                            </p>
                            <ul className="list-unstyled d-flex gap-3 social-link">
                                <li>
                                    <Link className='text-black' to="https://facebook.com">
                                        <LiaFacebookF />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='text-black' to="https://twitter.com">
                                        <FaTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='text-black' to="https://instagram.com">
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='text-black' to="https://youtube.com">
                                        <FaYoutube />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='text-black' to="https://pinterest.com">
                                        <IoLogoPinterest />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="footer-column footer-menu col mb-4">
                            <h5 className="fw-bold mb-4 text-uppercase">Company</h5>
                            <ul className="list-unstyled">
                                <li className='my-2'><Link className="text-black fw-light" to="/about">About Us</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/about">Careers</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/about">Affiliates</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/blog_list1">Blog</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Shop Column */}
                        <div className="footer-column footer-menu col mb-4">
                            <h5 className="fw-bold mb-4 text-uppercase">Shop</h5>
                            <ul className="list-unstyled">
                                <li className='my-2'><Link className="text-black fw-light" to="/shop-2">New Arrivals</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/shop-3">Accessories</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/shop-4">Men</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/shop-5">Women</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/shop-1">Shop All</Link></li>
                            </ul>
                        </div>

                        {/* Help Column */}
                        <div className="footer-column footer-menu col mb-4">
                            <h5 className="fw-bold mb-4 text-uppercase">Help</h5>
                            <ul className="list-unstyled">
                                <li className='my-2'><Link className="text-black fw-light" to="/about">Customer Service</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/account_dashboard">My Account</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/store_location">Find a Store</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/terms">Legal & Privacy</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/contact">Contact</Link></li>
                                <li className='my-2'><Link className="text-black fw-light" to="/about">Gift Card</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div className="footer-column footer-newsletter col mb-4">
                            <h5 className="fw-bold mb-4 text-uppercase">Subscribe</h5>
                            <p className='fs-6 mb-3'>Be the first to get the latest news about trends, promotions, and much more!</p>
                            <form className="footer-newsletter-form position-relative bg-body">
                                <input
                                    className="form-control border-white"
                                    type="email"
                                    placeholder="Your email address"
                                    name="email"
                                />
                                <input
                                    className="btn-custom px-4 fw-medium bg-white position-absolute top-0 end-0 h-100"
                                    type="submit"
                                    value="JOIN"
                                />
                            </form>
                            <div className="mt-4">
                                <strong className="fw-medium">Secure payments</strong>
                                <div className="d-flex mt-2">
                                    <img src={PaymentLogo1} alt="Paypal" width="40px" className='me-3' />
                                    <img src={PaymentLogo2} alt="MasterCard" width="40px" className='me-3' />
                                    <img src={PaymentLogo3} alt="Visa" width="40px" className='me-3' />
                                    <img src={PaymentLogo4} alt="American Express" width="40px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom container py-3 border-top">
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <span className="footer-copyright me-auto mb-2 mb-md-0">© 2024 CloStore</span>
                        <div className="footer-settings d-flex align-items-center">
                            <div className="d-flex align-items-center me-3">
                                <label htmlFor="footerSettingsLanguage" className="me-2 text-secondary">Language</label>
                                <select id="footerSettingsLanguage" className="form-select form-select-sm">
                                    <option value="">United Kingdom | English</option>
                                    <option value="1">United States | English</option>
                                    <option value="2">German</option>
                                    <option value="3">French</option>
                                    <option value="4">Swedish</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                <label htmlFor="footerSettingsCurrency" className="me-2 text-secondary">Currency</label>
                                <select id="footerSettingsCurrency" className="form-select form-select-sm">
                                    <option value="">$ USD</option>
                                    <option value="1">€ EUR</option>
                                    <option value="2">£ GBP</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;