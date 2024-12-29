import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';
import axios from 'axios';
import './style.css';

const TrendyProducts = () => {
    const [activeTab, setActiveTab] = useState('All');
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [products, setProducts] = useState([]);

    const handleAddToCart = (product) => {
        if (!user) {
            navigate('/login');
        } else {
            addToCart(product);
        }
    };

    const handleWishlistToggle = (product) => {
        if (!user) {
            navigate('/login');
        } else if (wishlist.some(item => item._id === product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const storedProducts = localStorage.getItem('trendyProducts');
                if (storedProducts) {
                    setProducts(JSON.parse(storedProducts));
                } else {
                    const response = await axios.get(`http://localhost:5000/api/products`);
                    const shuffledProducts = shuffleArray(response.data).slice(0, 30);
                    const productsWithRandomCategories = shuffledProducts.map(product => ({
                        ...product,
                        category: getRandomCategory()
                    }));
                    setProducts(productsWithRandomCategories);
                    localStorage.setItem('trendyProducts', JSON.stringify(productsWithRandomCategories));
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                try {
                    const localResponse = await axios.get('../../../../BackEnd/data/products.json');
                    const product = localResponse.data.find(p => p._id.$oid === id);
                    setProducts(product);
                } catch (jsonError) {
                    console.error('Error loading local product details:', jsonError);
                }
            }
        };

        fetchProducts();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const getRandomCategory = () => {
        const categories = ['All', 'New Arrivals', 'Best Seller', 'Top Rated'];
        return categories[Math.floor(Math.random() * categories.length)];
    };

    const filteredProducts = products.filter(product => product.category === activeTab || activeTab === 'All');

    return (
        <section className="trendy-products my-5">
            <div className="tabs text-center d-flex justify-content-center">
                {['All', 'New Arrivals', 'Best Seller', 'Top Rated'].map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 nav-link ${activeTab === category ? 'active border-bottom border-3 border-black' : 'text-secondary'}`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="cards d-flex flex-wrap justify-content-center justify-content-md-start w-100 mt-6">
                {filteredProducts.slice(0, 8).map(product => {
                    const isInWishlist = wishlist.some(item => item._id === product._id);
                    const imageUrl = `http://localhost:5000/${product.image.replace(/\\/g, '/')}`;
                    return (
                        <div key={product._id} className="trendy-product-card col-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="product-img-wrapper position-relative mt-5">
                                <Link to={`/productdetails/${product._id}`}>
                                    <img src={imageUrl} alt={product.name} className='trendy-products-img' />
                                </Link>
                                <button
                                    className="product-atc product-btn position-absolute border-0 text-uppercase fw-medium"
                                    title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                    Add To Cart
                                </button>
                            </div>
                            <div className="product-info position-relative mt-4">
                                <p className="product-category d-none">{product.category}</p>
                                <h6 className="product-title">
                                    <Link to={`/productdetails/${product._id}`} className='text-decoration-none text-black fw-light'>{product.name}</Link>
                                    <button className="product-atc product-btn position-absolute border-0 text-uppercase fw-medium" title="Add to Cart" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                                </h6>
                                <div className="product-card-price d-flex">
                                    <span className="money price">$ {product.price}</span>
                                </div>
                                <div className="product-card-review d-flex align-items-center justify-content-between">
                                    <div className="reviews-group d-flex">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar key={index} color={index < product.rating ? '#ffc78b' : '#ccc'} />
                                        ))}
                                    </div>
                                    <span className="reviews-note text-lowercase text-secondary ms-1">{product.reviews}k+ reviews</span>
                                </div>
                                <button className="product-btn-wl position-absolute top-0 end-0 bg-transparent border-0" title="Toggle Wishlist" onClick={() => handleWishlistToggle(product)}>
                                    {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="view-more mt-6 text-center">
                <Link to="/products" className="px-6 py-2 wdt-button-3 py-3 px-4 fs-6 rounded-4">
                    View More
                </Link>
            </div>
        </section>
    );
};

export default TrendyProducts;