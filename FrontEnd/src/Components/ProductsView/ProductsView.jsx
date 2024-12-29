import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification';
import './style.css';

const ProductsView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ type: '', message: '' });
    const [initialLoad, setInitialLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const { user } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data);

                if (!initialLoad) {
                    setToast({ type: 'info', message: 'Products loaded successfully!' });
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                try {
                    const localResponse = await axios.get('../../../../BackEnd/data/products.json');
                    setProducts(localResponse.data);
                } catch (jsonError) {
                    console.error('Error loading local products:', jsonError);
                    setError('Failed to load products');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [initialLoad]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    "x-auth-token": user.token,
                },
            });
            setProducts(products.filter(product => product._id !== id));
            setToast({ type: 'success', message: 'Product deleted successfully!' });
        } catch (err) {
            setToast({ type: 'error', message: 'Error deleting product.' });
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCloseSnackbar = () => {
        setToast({ type: '', message: '' });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Products List</h2>
            <SnackbarNotification type={toast.type} message={toast.message} onClose={handleCloseSnackbar} />

            {/* Desktop View (Table Layout) */}
            <div className="d-none d-lg-block">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className='py-4'>Image</th>
                            <th className='py-4'>Title</th>
                            <th className='py-4'>Price</th>
                            <th className='py-4'>Rating</th>
                            <th className='py-4 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => {
                            const imageUrl = `http://localhost:5000/${product.image.replace(/\\/g, '/')}`;
                            return (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            width="150"
                                            className="img-fluid"
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.rating}</td>
                                    <td className='text-center'>
                                        <Link to={`/edit-product/${product._id}`} className="btn-custom wdt-button-action text-white px-4 py-2 mx-2 mr-2">Edit</Link>
                                        <button onClick={() => handleDelete(product._id)} className="btn-custom wdt-button-action text-white px-4 py-2 mx-2">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Card Layout) */}
            <div className="d-lg-none">
                <div className="row g-4">
                    {currentProducts.map((product) => {
                        const imageUrl = `http://localhost:5000/${product.image.replace(/\\/g, '/')}`;
                        return (
                            <div className="col-12" key={product._id}>
                                <div className="card shadow-sm w-100">
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                width="100"
                                                className="img-fluid rounded-3"
                                            />
                                            <div className="ms-3">
                                                <h5 className="card-title mb-1">{product.name}</h5>
                                                <p className="card-text mb-1">Price: ${product.price.toFixed(2)}</p>
                                                <p className="card-text mb-1">Rating: {product.rating}</p>
                                                <div className="d-md-none d-sm-block">
                                                    <Link to={`/edit-product/${product._id}`} className="btn-custom wdt-button-action text-white px-3 py-2 mx-2">Edit</Link>
                                                    <button onClick={() => handleDelete(product._id)} className="btn-custom wdt-button-action text-white px-3 py-2 mx-2">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-xsm-none d-md-block">
                                            <Link to={`/edit-product/${product._id}`} className="btn-custom wdt-button-action text-white px-3 py-2 mx-2">Edit</Link>
                                            <button onClick={() => handleDelete(product._id)} className="btn-custom wdt-button-action text-white px-3 py-2 mx-2">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between my-4">
                <button className="btn-custom wdt-button-pagination fw-bold px-3 py-2 text-white mx-4" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button className="btn-custom wdt-button-pagination fw-bold px-3 py-2 text-white mx-4" onClick={handleNextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default ProductsView;