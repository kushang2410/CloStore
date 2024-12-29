import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext';
import axios from 'axios';
import './SwiperCrousel2.css';

const SwiperCrousel2 = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [products, setProducts] = useState([]);
    const [autoplay, setAutoplay] = useState({ delay: 1000, disableOnInteraction: false });

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
                const response = await axios.get(`https://clostore.onrender.com/api/products`);
                setProducts(response.data.slice(20, 40));
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


    const handleMouseEnter = () => {
        setAutoplay({ ...autoplay, delay: 999999999 });
    };

    const handleMouseLeave = () => {
        setAutoplay({ delay: 1000, disableOnInteraction: false });
    };


    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            autoplay={autoplay}
            modules={[Autoplay]}
            className="mySwiper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1.3,
                },
                768: {
                    slidesPerView: 1.5,
                },
                992: {
                    slidesPerView: 2.5,
                },
                1024: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 4,
                },
            }}
        >
            {products.map(product => {
                const isInWishlist = wishlist.some(item => item._id === product._id);
                const imageUrl = `https://clostore.onrender.com/${product.image.replace(/\\/g, '/')}`;
                return (
                    <SwiperSlide key={product._id}>
                        <div className="product-img-wrapper position-relative">
                            <Link to={`/productdetails/${product._id}`}>
                                <img src={imageUrl} alt={product.name} />
                            </Link>
                            <button className="product-atc product-btn position-absolute border-0 text-uppercase fw-medium" onClick={() => handleAddToCart(product)} title="Add to Cart">Add To Cart</button>
                        </div>
                        <div className="product-info position-relative mt-4">
                            <h6 className="product-title">
                                <div className='text-decoration-none text-black fw-light'>{product.name}</div>
                            </h6>
                            <div className="product-card-price d-flex">
                                <span className="money price">$ {product.price}</span>
                            </div>
                            <div className="product-card-review d-flex align-items-center">
                                <div className="reviews-group d-flex">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} color={index < product.rating ? '#ffc78b' : '#ccc'} />
                                    ))}
                                </div>
                                <span className="reviews-note text-lowercase text-secondary ms-1">3.2k+ reviews</span>
                            </div>
                            <button className="product-btn-wl position-absolute top-0 end-0 end-25 bg-transparent border-0" title="Toggle Wishlist" onClick={() => handleWishlistToggle(product)}>
                                {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                            </button>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default SwiperCrousel2;