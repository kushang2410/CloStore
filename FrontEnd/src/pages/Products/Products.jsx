import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaBars, FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import ShopBanner1 from '../../assets/images/banner/shop-banner-1.png';
import FilterOffCanvas from '../../OffCanvas/FilterOffCanvas/FilterOffCanvas';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import './style.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(16);
  const [sortBy, setSortBy] = useState('featured');
  const [layout, setLayout] = useState('col-3');
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { wishlist, addToWishlist, removeFromWishlist, toastConfig: wishlistToast, resetToast: resetWishlistToast } = useWishlist();
  const { cart, addToCart, removeFromCart, toastConfig: cartToast, resetToast: resetCartToast } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [filters, setFilters] = useState({
    priceRange: [20, 3996],
    selectedBrands: [],
    selectedColors: [],
    selectedSizes: [],
    selectedCategory: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const updateLayout = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 320 && screenWidth < 768) {
      setLayout('col-12');
    } else if (screenWidth >= 768 && screenWidth < 992) {
      setLayout('col-6');
    } else if (screenWidth >= 992 && screenWidth < 1120) {
      setLayout('col-4');
    } else if (screenWidth >= 1220) {
      setLayout('col-3');
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://clostore.onrender.com/api/products?category=${category || ''}`);
        const productsWithDetails = addRandomDetails(response.data);
        setProducts(productsWithDetails);
      } catch (serverError) {
        console.error('Error fetching products from server:', serverError);
        try {
          const localResponse = await axios.get('../../../../BackEnd/data/products.json');
          const productsWithDetails = addRandomDetails(localResponse.data);
          setProducts(productsWithDetails);
        } catch (jsonError) {
          console.error('Error loading local products:', jsonError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const addRandomDetails = (products) => {
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const brands = ['Adidas', 'Nike', 'Balenciaga', 'Puma', 'Kenzo', 'Givenchy'];

    return products.map(product => ({
      ...product,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      brand: brands[Math.floor(Math.random() * brands.length)]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} color='#ffc78b' />);
    }
    return stars;
  };

  const handleViewMore = () => {
    setDisplayedProducts(prev => prev + 16);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleWishlistToggle = (product) => {
    if (wishlist.some(item => item._id === product._id)) {
      removeFromWishlist(product._id);
      setToastMessage('Product removed from wishlist');
      setToastType('info');
    } else {
      addToWishlist(product);
      setToastMessage('Product added to wishlist successfully');
      setToastType('success');
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage('Product added to cart successfully');
    setToastType('success');
  };

  const handleFilterSubmit = async (newFilters) => {
    setFilters(newFilters);
    try {
      const response = await axios.get(`https://clostore.onrender.com/api/products`, {
        params: {
          category: newFilters.selectedCategory || category || '',
          color: newFilters.selectedColors.join(','),
          size: newFilters.selectedSizes.join(','),
          minPrice: newFilters.priceRange[0],
          maxPrice: newFilters.priceRange[1]
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
    const offCanvas = document.getElementById('shopFilterAside');
    const bsOffCanvas = new window.bootstrap.Offcanvas(offCanvas);
    bsOffCanvas.hide();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const colorMatch = filters.selectedColors.length === 0 || filters.selectedColors.includes(product.color);
    const sizeMatch = filters.selectedSizes.length === 0 || filters.selectedSizes.includes(product.size);
    const brandMatch = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand);
    return nameMatch && colorMatch && sizeMatch && brandMatch && product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-to-high':
        return a.price - b.price;
      case 'price-high-to-low':
        return b.price - a.price;
      case 'rating-high-to-low':
        return b.rating - a.rating;
      case 'rating-low-to-high':
        return a.rating - b.rating;
      case 'name-a-to-z':
        return a.name.localeCompare(b.name);
      case 'name-z-to-a':
        return b.name.localeCompare(a.name);
      case 'featured':
      default:
        return 0;
    }
  });

  const handleCloseSnackbar = () => {
    setToastMessage(null);
  };

  return (
    <div className='mt-9'>
      <section className='shop-banner my-5 position-relative'>
        <img src={ShopBanner1} alt="" className='w-100' />
        <div className='position-absolute top-25 start-xsm-23 start-21'>
          <h1 className='shop-banner-title'>JACKETS & COATS</h1>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="d-sm-block d-md-flex justify-content-between align-items-baseline">
              <div className="d-flex justify-content-between align-items-center position-relative">
                <h1 className="heading-title page-title entry-title">Shop</h1>
                <div className="d-sm-block d-md-none ms-sm-0 ms-md-4 border border-1">
                  <input type="text" className="form-control form-control-sm border-light border-2" placeholder="SEARCH" name="search_text" onChange={handleSearchChange} />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-baseline">
                <h5 className="mx-3 d-xsm-none d-md-block">View By</h5>
                <FaBars className="mx-3 d-xsm-none d-lg-block" style={{ cursor: "pointer" }} onClick={() => handleLayoutChange('col-12')} />
                <BsFillGridFill className="mx-3 d-xsm-none d-lg-block" style={{ cursor: "pointer" }} onClick={() => handleLayoutChange('col-6')} />
                <BsGrid3X3GapFill className="mx-3 d-xsm-none d-lg-block" style={{ cursor: "pointer" }} onClick={() => handleLayoutChange('col-4')} />
                <TfiLayoutGrid4Alt className="mx-3 d-xsm-none d-lg-block" style={{ cursor: "pointer" }} onClick={() => handleLayoutChange('col-3')} />
                <h5 className="mx-3 d-md-none">View By</h5>
                <div className="d-flex align-items-center mt-4">
                  <div className="dropdown mx-3">
                    <button className="px-4 wdt-button-3 py-2 fs-6 rounded-4 dropdown-toggle" type="button" id="sortDropdown"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      Sort By
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                      <li><button className="dropdown-item" value="featured" onClick={handleSortChange}>Default</button></li>
                      <li><button className="dropdown-item" value="price-low-to-high" onClick={handleSortChange}>Price: Low to High</button></li>
                      <li><button className="dropdown-item" value="price-high-to-low" onClick={handleSortChange}>Price: High to Low</button></li>
                      <li><button className="dropdown-item" value="name-a-to-z" onClick={handleSortChange}>Name: A to Z</button></li>
                      <li><button className="dropdown-item" value="name-z-to-a" onClick={handleSortChange}>Name: Z to A</button></li>
                      <li><button className="dropdown-item" value="rating-high-to-low" onClick={handleSortChange}>Rating: High to Low</button></li>
                      <li><button className="dropdown-item" value="rating-low-to-high" onClick={handleSortChange}>Rating: Low to High</button></li>
                    </ul>
                  </div>
                  <button className="px-4 wdt-button-3 py-2 fs-6 rounded-4 ms-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#shopFilterAside" aria-controls="shopFilterAside">
                    Filter
                  </button>
                </div>
                <div className="ms-sm-0 ms-md-4 border border-1 d-xsm-none d-md-block">
                  <input type="text" className="form-control form-control-sm border-light border-2" placeholder="SEARCH" name="search_text" onChange={handleSearchChange} />
                </div>
              </div>
            </div>
            <FilterOffCanvas onFilterSubmit={handleFilterSubmit} />
            <div className="row">
              {isLoading && <Loader />}
              {sortedProducts.slice(0, displayedProducts).map(product => {
                const imageUrl = `https://clostore.onrender.com/${product.image.replace(/\\/g, '/')}`;
                const isInWishlist = wishlist.some(item => item._id === product._id);
                const customClass = layout === 'col-3' ? 'product-col-3' :
                  layout === 'col-6' ? 'product-col-6' :
                    layout === 'col-4' ? 'product-col-4' :
                      layout === 'col-12' ? 'product-col-12' : '';
                return (
                  <div className={`${layout} mb-4 ${customClass}`} key={product._id}>
                    <div className={`product-info position-relative mt-4 ${layout === 'col-12' ? 'd-flex justify-content-between' : ''}`}>
                      <Link to={`/productdetails/${product._id}`} className='text-decoration-none'>
                        <div className={`product-image-container ${layout === 'col-12' ? 'w-50' : 'w-100'}`}>
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className={`product-main-image ${customClass}`}
                          />
                        </div>
                      </Link>
                      <div className={`product-details ${layout === 'col-12' ? 'w-50 ms-3' : ''}`}>
                        <p className="product-category d-none">{product.category}</p>
                        <h6 className="product-title position-relative mt-3">
                          <Link to={`/productdetails/${product._id}`} className='text-decoration-none text-black fw-light'>{product.name}</Link>
                          <button className="product-btn-wl position-absolute top-0 end-0 bg-transparent border-0 shop-btn" title="Toggle Wishlist" onClick={() => handleWishlistToggle(product)}>
                            {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                          </button>
                          {layout === 'col-12' ? (
                            <button className="product-main-atc-2 product-main-btn-2 position-absolute border border-2 text-uppercase fw-medium" title="Add to Cart" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                          ) : (
                            <button className="product-main-atc product-main-btn position-absolute border-0 text-uppercase fw-medium" title="Add to Cart" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                          )}
                        </h6>
                        <div className="product-card-price d-flex">
                          <span className="money price">$ {product.price}</span>
                        </div>
                        <div className="product-card-review d-flex justify-content-between align-items-center">
                          <div className="reviews-group d-flex">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {displayedProducts < products.length && (
              <div className="d-flex justify-content-center my-4">
                <button className="px-4 py-2 wdt-button-3 py-3 px-4 fs-6 rounded-4" onClick={handleViewMore}>
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {toastMessage && <SnackbarNotification type={toastType} message={toastMessage} onClose={handleCloseSnackbar} />}
      {wishlistToast && (
        <SnackbarNotification
          type={wishlistToast.type}
          message={wishlistToast.message}
          onClose={resetWishlistToast}
        />
      )}
      {cartToast && (
        <SnackbarNotification
          type={cartToast.type}
          message={cartToast.message}
          onClose={resetCartToast}
        />
      )}
    </div>
  );
};

export default Products;