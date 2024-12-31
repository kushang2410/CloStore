import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { FaRegHeart, FaHome } from "react-icons/fa";
import { IoIosContact, IoIosMan, IoIosWoman } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { GiSonicShoes, GiSteampunkGoggles } from "react-icons/gi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { LiaShoppingBagSolid } from "react-icons/lia";
import logo from "../../assets/images/logo/logo-4.png";
import './style.css';

const MobileHeader = () => {
    const { user } = useAuth();
    const { cart } = useCart();
    const { wishlist } = useWishlist();

    return (
        <div className="d-xl-none">
            <nav className="navbar navbar-light bg-white border-bottom">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" height="45" />
                    </Link>
                    <div className="d-flex justify-content-between align-items-baseline">
                        <div className="nav-item position-relative mx-2">
                            <Link className="nav-link text-dark" to="/wishlist">
                                <FaRegHeart fontSize="23px" />
                                {wishlist.length > 0 && (
                                    <span className="position-absolute translate-middle badge rounded-pill bg-black" style={{ top: "-5px", right: "5px" }}>
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <div className="nav-item position-relative mx-2">
                            <Link className="nav-link text-dark" to="/mycart">
                                <LiaShoppingBagSolid fontSize="24px" />
                                {cart.length > 0 && (
                                    <span className="position-absolute translate-middle badge rounded-pill bg-black" style={{ top: "-5px", right: "5px" }}>
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <button className="navbar-toggler mx-1 border-0" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#mobileOffcanvas" aria-controls="mobileOffcanvas">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileOffcanvas"
                aria-labelledby="mobileOffcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="mobileOffcanvasLabel">
                        <Link to="/">
                            <img src={logo} alt="Logo" height="45" />
                        </Link>
                    </h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        <li className="nav-item" data-bs-dismiss="offcanvas">
                            <Link className="nav-link text-dark" to="/">
                                <FaHome />
                                <span className="ms-4">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item" data-bs-dismiss="offcanvas">
                            <Link className="nav-link text-dark" to="/products">
                                <FaShop />
                                <span className="ms-4">Shop</span>
                            </Link>
                        </li>
                        <li className="nav-item" style={{ cursor: "pointer" }}>
                            <div className="accordion" id="categoryAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header fw-normal my-2" id="categoryHeading">
                                        <div className="custom-accordion-button" data-bs-toggle="collapse"
                                            data-bs-target="#categoryCollapse" aria-expanded="false"
                                            aria-controls="categoryCollapse" style={{ fontSize: "18px" }}>
                                            <MdCategory className="me-4" />
                                            Categories
                                        </div>
                                    </h2>
                                    <div id="categoryCollapse" className="accordion-collapse collapse"
                                        aria-labelledby="categoryHeading" data-bs-parent="#categoryAccordion">
                                        <div className="accordion-body">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" to={`/products?category=Women`}>
                                                        <IoIosWoman />
                                                        <h5 className="my-4 text-dark ms-4">Women</h5>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" to={`/products?category=Men`}>
                                                        <IoIosMan />
                                                        <h5 className="my-4 text-dark ms-4">Men</h5>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" to={`/products?category=Shoes`}>
                                                        <GiSonicShoes />
                                                        <h5 className="my-4 text-dark ms-4">Shoes</h5>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center" to={`/products?category=accessories`}>
                                                        <GiSteampunkGoggles />
                                                        <h5 className="my-4 text-dark ms-4">Accessories</h5>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item" data-bs-dismiss="offcanvas">
                            <Link className="nav-link text-dark" to="/about">
                                <BiMessageSquareDetail />
                                <span className="ms-4">About</span>
                            </Link>
                        </li>
                        <li className="nav-item" data-bs-dismiss="offcanvas">
                            <Link className="nav-link text-dark" to="/contact">
                                <IoIosContact />
                                <span className="ms-4">Contact Us</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav mt-4">
                        {user ? (
                            <li className="nav-item" data-bs-dismiss="offcanvas">
                                <Link className="nav-link text-dark" to="/account">
                                    <RiContactsFill />
                                    <span className="ms-4">Account</span>
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item" data-bs-dismiss="offcanvas">
                                <Link className="nav-link text-dark" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;