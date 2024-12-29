import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import logo from "../../assets/images/logo/logo-4.png";
import CategoryBanner1 from "../../assets/images/banner/category-banner-3.jpg";
import CategoryBanner2 from "../../assets/images/banner/category-banner-2.jpg";
import CategoryBanner3 from "../../assets/images/banner/category-banner-1.jpg";
import CategoryBanner4 from "../../assets/images/banner/category-banner-4.jpg";
import CartOffCanvas from "../../OffCanvas/CartOffCanvas/CartOffCanvas";
import './style.css';

const NavBar = () => {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const { wishlist } = useWishlist();

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://clostore.onrender.com/api/products');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        try {
          const localResponse = await axios.get('/data/products.json');
          setAllProducts(localResponse.data);
        } catch (jsonError) {
          console.error('Error loading local product details:', jsonError);
        }
      }
    };

    fetchProducts();
  }, []);

  const filterCartItems = useCallback(() => {
    const filteredCartItems = allProducts.filter(product =>
      cart.some(cartItem => cartItem._id === product._id)
    );
    setCartItems(filteredCartItems);
  }, [allProducts, cart]);

  useEffect(() => {
    filterCartItems();
  }, [filterCartItems]);

  useEffect(() => {
    filterCartItems();
  }, [cart]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom position-fixed top-0 z-3 w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <Link className="navbar-brand ms-4" to="/">
            <img src={logo} alt="Logo" height="45" />
          </Link>

          {/* Hamburger Menu for 768px to 992px */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar (Hidden on Mobile) */}
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-block" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/products">
                  Shop
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-dark"
                  to="#"
                  id="categoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="categoryDropdown">
                  <li className="dropdown-item">
                    <div className="d-flex justify-content-center align-items-center text-center">
                      <div className="col-md-3">
                        <Link className="navbar-container" to={`/products?category=Women`}>
                          <img src={CategoryBanner1} alt="Women" className="banner-img" />
                          <div className="navbar-overlay">
                            <span className="plus-btn">+</span>
                          </div>
                          <h5 className="mt-3 text-black">Women</h5>
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <Link className="navbar-container" to={`/products?category=Men`}>
                          <img src={CategoryBanner2} alt="Men" className="banner-img" />
                          <div className="navbar-overlay">
                            <span className="plus-btn">+</span>
                          </div>
                          <h5 className="mt-3 text-black">Men</h5>
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <Link className="navbar-container" to={`/products?category=Shoes`}>
                          <img src={CategoryBanner3} alt="Shoes" className="banner-img" />
                          <div className="navbar-overlay">
                            <span className="plus-btn">+</span>
                          </div>
                          <h5 className="mt-3 text-black">Shoes</h5>
                        </Link>
                      </div>
                      <div className="col-md-3">
                        <Link className="navbar-container" to={`/products?category=accessories`}>
                          <img src={CategoryBanner4} alt="Glasses" className="banner-img" />
                          <div className="navbar-overlay">
                            <span className="plus-btn">+</span>
                          </div>
                          <h5 className="mt-3 text-black">accessories</h5>
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav d-flex align-items-baseline">
            {user ? (
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark" to="/account">
                  <IoPersonOutline fontWeight="bold" fontSize="23px" />
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-2">
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item mx-2 position-relative">
              <Link className="nav-link text-dark" to="/wishlist">
                <FaRegHeart fontWeight="bold" fontSize="23px" />
                {wishlist.length > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill bg-black" style={{ top: "10px", left: "45px" }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item ms-2 me-5 position-relative">
              <Link className="nav-link text-dark" to="#" onClick={toggleOffCanvas}>
                <LiaShoppingBagSolid fontWeight="bold" fontSize="24px" />
                {cart.length > 0 && (
                  <span className="position-absolute start-100 translate-middle badge rounded-pill bg-black" style={{ top: "10px" }}>
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <CartOffCanvas
        show={isOffCanvasOpen}
        onHide={toggleOffCanvas}
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateCartItemQuantity={updateCartItemQuantity}
      />
    </div>
  );
};

export default NavBar;