import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegHeart, FaHeart, FaCheck } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import SwiperCarousel2 from "../../Slider/slider-2/SwiperCrousel2";
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import ProductDetailsBanner1 from '../../assets/images/banner/productdetailsbanner-1.webp';
import ProductDetailsBanner2 from '../../assets/images/banner/productdetailsbanner-2.webp';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { wishlist, addToWishlist, removeFromWishlist, toastConfig: wishlistToast, resetToast: resetWishlistToast } = useWishlist();
        const { cart, addToCart, removeFromCart, toastConfig: cartToast, resetToast: resetCartToast } = useCart();
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const [activeTab, setActiveTab] = useState('information');
    const [toastConfig, setToastConfig] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const availableColors = [
        { colorName: 'yellow', colorCode: '#d7bb4f' },
        { colorName: 'black', colorCode: '#282828' },
        { colorName: 'sky', colorCode: '#b1d6e8' },
        { colorName: 'darkyellow', colorCode: '#9c7539' },
        { colorName: 'mediumyellow', colorCode: '#d29b48' },
        { colorName: 'lightorange', colorCode: '#e6ae95' },
        { colorName: 'lightred', colorCode: '#d76b67' },
        { colorName: 'lightgray', colorCode: '#bababa' },
        { colorName: 'lightgreen', colorCode: '#bfdcc4' }
    ];

    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://clostore1.onrender.com/api/products/${id}`);
                setProduct(response.data);
                const initialColors = getLimitedColorsForProduct(response.data._id);
                const initialSizes = getLimitedSizesForProduct(response.data._id);
                setSelectedColor(initialColors[0].colorCode);
                setSelectedSize(initialSizes[0]);
            } catch (error) {
                console.error('Error fetching product details:', error);
                try {
                    const localResponse = await axios.get('../../../../BackEnd/data/products.json');
                    const product = localResponse.data.find(p => p._id.$oid === id);
                    setProduct(product);
                } catch (jsonError) {
                    console.error('Error loading local product details:', jsonError);
                }
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    const getLimitedColorsForProduct = (productId) => {
        const startIndex = Math.abs(productId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % availableColors.length;
        return availableColors.slice(startIndex, startIndex + 3);
    };

    const getLimitedSizesForProduct = (productId) => {
        const startIndex = Math.abs(productId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % availableSizes.length;
        return availableSizes.slice(startIndex, startIndex + 2);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (!selectedColor && !selectedSize) {
            setToastConfig({ type: 'error', message: 'Please select both color and size before adding to cart' });
            return;
        }
        if (!selectedColor) {
            setToastConfig({ type: 'error', message: 'Please select a color before adding to cart' });
            return;
        }
        if (!selectedSize) {
            setToastConfig({ type: 'error', message: 'Please select a size before adding to cart' });
            return;
        }

        const cartItem = {
            ...product,
            selectedSize,
            selectedColor,
            quantity,
        };
        const existingCartItem = cart.find(item => item._id === product._id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
        if (existingCartItem) {
            updateCartItemQuantity(existingCartItem._id, existingCartItem.quantity + quantity);
            setToastConfig({ type: 'success', message: 'Quantity updated in cart' });
        } else {
            addToCart(cartItem);
            setToastConfig({ type: 'success', message: 'Product added to cart successfully' });
        }
    };

    const handleAddToWishlist = () => {
        if (wishlist.some(item => item._id === product._id)) {
            removeFromWishlist(product._id);
            setToastConfig({ type: 'info', message: 'Product removed from wishlist' });
        } else {
            addToWishlist(product);
            setToastConfig({ type: 'success', message: 'Product added to wishlist successfully' });
        }
    };

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
        setZoomStyle({});
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;
        const xPos = (offsetX / offsetWidth) * 100;
        const yPos = (offsetY / offsetHeight) * 100;
        setZoomStyle({
            transformOrigin: `${xPos}% ${yPos}%`,
            transform: 'scale(2)',
        });
    };

    const handleCloseSnackbar = () => {
        setToastConfig(null);
    };

    return (
        <>
            <section className="container mt-10 mb-10">
                <div className="row">
                    <div className="col-lg-4 me-5">
                        <div className="product-image-container" style={{ overflow: 'hidden', position: 'relative' }}>
                            <img src={`https://clostore1.onrender.com/${product.image.replace(/\\/g, '/')}`}
                                alt={product.name} className="w-100" onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}
                                style={{ ...zoomStyle, transition: 'transform 0.2s ease', cursor: 'zoom-in', }} />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <h1 className="mb-4">{product.name}</h1>
                        <div className="d-flex align-items-center mb-4">
                            <div className="d-flex">
                                {Array(5).fill().map((_, i) => (
                                    <FaStar key={i} color={i < product.rating ? '#ffc78b' : '#e4e5e9'} />
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="fs-4">${product.price}</span>
                        </div>
                        <p className="mb-4">{product.description}</p>
                        <form>
                            <div className="mb-4">
                                <label className="form-label">Color</label>
                                <div className="d-flex align-items-center">
                                    {getLimitedColorsForProduct(product._id).map((color, index) => (
                                        <Link
                                            key={index}
                                            className={`swatch-color js-filter m-2 rounded-5 border ${selectedColor === color.colorCode ? 'border-black border-2' : 'border-white'}`}
                                            style={{
                                                backgroundColor: color.colorCode, height: "30px", width: "30px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => setSelectedColor(color.colorCode)}
                                        >
                                            {selectedColor === color.colorCode && <FaCheck className="text-white" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Size</label>
                                <div className="d-flex align-items-center">
                                    {getLimitedSizesForProduct(product._id).map((size, index) => (
                                        <Link
                                            key={index}
                                            className={`border border-1 text-black px-3 py-2 btn btn-sm btn-outline-light mb-3 me-3 js-filter ${selectedSize === size ? 'border-black' : ''}`}
                                            style={{
                                                cursor: "pointer",
                                                backgroundColor: selectedSize === size ? '#f0f0f0' : 'transparent'
                                            }}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                            {selectedSize === size && <FaCheck className="ms-2" />}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex align-items-center border border-2 rounded-5 my-4" style={{ width: "145px" }}>
                                <button className="btn ms-2" onClick={() => handleQuantityChange('decrease')}>-</button>
                                <input type="number" className="form-control border border-0 ps-4" min="1" max="10" step="1"
                                    value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    style={{ width: "60px", textAlign: "center" }} />
                                <button className="btn" onClick={() => handleQuantityChange('increase')}>+</button>
                            </div>
                            <button type="button" className="custom-btn wdt-button-3 py-2 px-3 fs-6 rounded-3 me-3 mt-3" onClick={handleAddToCart}>Add to Cart</button>
                            <button type="button" className="btn border border-0" onClick={handleAddToWishlist}>
                                {wishlist.some(item => item._id === product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                                <span className="ms-2">Add to Wishlist</span>
                            </button>
                        </form>
                    </div>
                </div>
                {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
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
            </section>
            <section className='my-10'>
                <SwiperCarousel2 />
            </section>
        </>
    );
};

export default ProductDetails;