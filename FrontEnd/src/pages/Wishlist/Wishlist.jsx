import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import EmptyCart from '../../assets/images/svg/cart-empty.svg';
import './style.css';
import { IoClose } from 'react-icons/io5';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [toastMessage, setToastMessage] = useState(null);

    const handleAddToCart = (product) => {
        addToCart(product);
        setToastMessage(`${product.name} added to cart!`);
    };

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId);
    };

    const handleCloseSnackbar = () => {
        setToastMessage(null);
    };

    if (!wishlist || wishlist.length === 0) {
        return (
            <div className="container mt-10 mb-10">
                <div className='mt-8'>
                    <div className="col-12 container mt-10">
                        <h1>Wishlist</h1>
                        <div className="text-center my-10">
                            <img src={EmptyCart} alt="Empty Wishlist" className="img-fluid" />
                            <div className="fs-4 my-4">
                                No items in wishlist
                            </div>
                            <p className="return-to-shop">
                                <Link to="/products" className="btn-custom wdt-button-2 mx-4">Return to shop</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-10">
            <h2 className="text-center mb-4">My Wishlist</h2>

            {/* Desktop View (Table) */}
            <div className="d-none d-lg-block">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead className="">
                            <tr>
                                <th className='py-4'></th>
                                <th className='py-4'>Image</th>
                                <th className='py-4'>Product Name</th>
                                <th className='py-4'>Unit Price</th>
                                <th className='py-4'>Stock Status</th>
                                <th className='py-4 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map((product) => {
                                const imageUrl = `https://clostore.onrender.com/${product.image.replace(/\\/g, '/')}`;
                                return (
                                    <tr key={product._id}>
                                        <td className='pt-5'>
                                            <IoClose onClick={() => handleRemoveFromWishlist(product._id)} className="cursor-pointer" />
                                        </td>
                                        <td>
                                            <img src={imageUrl} alt={product.name} className="img-fluid" style={{ width: "100px", marginLeft: "10px" }} />
                                        </td>
                                        <td className='pt-5'>{product.name}</td>
                                        <td className='pt-5'>${product.price}</td>
                                        <td className='pt-5'>In Stock</td>
                                        <td className='text-center pt-5'>
                                            <button
                                                className="btn-custom wdt-button-3 text-white px-4 py-2 mx-2"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View (Card Layout) */}
            <div className="d-lg-none">
                <div className="row g-4">
                    {wishlist.map((product) => {
                        const imageUrl = `https://clostore.onrender.com/${product.image.replace(/\\/g, '/')}`;
                        return (
                            <div className="col-12" key={product._id}>
                                <div className="card shadow-sm w-100 mb-3">
                                    <div className="card-body d-md-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <IoClose
                                                onClick={() => handleRemoveFromWishlist(product._id)}
                                                className="cursor-pointer fs-4 me-3"
                                            />
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                className="img-fluid"
                                                style={{ width: "100px", height: "140px", objectFit: "cover" }}
                                            />
                                            <div className="ms-3">
                                                <h5 className="card-title mb-1">{product.name}</h5>
                                                <p className="card-text mb-1">${product.price}</p>
                                                <p className="card-text mb-2">In Stock</p>
                                                <button
                                                    className="d-md-none d-sm-block btn-custom wdt-button-3 text-white px-3 py-2"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="d-xsm-none d-md-block btn-custom wdt-button-3 text-white px-3 py-2"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {toastMessage && (
                <SnackbarNotification type="success" message={toastMessage} onClose={handleCloseSnackbar} />
            )}
        </div>
    );
};

export default Wishlist;