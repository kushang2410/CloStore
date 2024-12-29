import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";
import logo from '../../assets/images/logo/logo-5.png';
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification';
import axios from "axios";
import './style.css';

const ProductForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useAuth();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          const product = response.data;
          setValue("name", product.name);
          setValue("rating", product.rating);
          setValue("price", product.price);
          setImageUrl(`http://localhost:5000/${product.image.replace(/\\/g, '/')}`);
        } catch (error) {
          setToast({ type: 'error', message: "Error fetching product." });
        }
      };

      fetchProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rating", parseFloat(data.rating));
    formData.append("price", parseFloat(data.price));
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.token,
          },
        });
        setToast({ type: 'success', message: "Product updated successfully!" });
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.token,
          },
        });
        setToast({ type: 'success', message: "Product added successfully!" });
      }
      reset();
    } catch (error) {
      setToast({ type: 'error', message: "Error saving product." });
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  const handleCloseSnackbar = () => {
    setToast({ type: '', message: '' });
  };

  return (
    <div className='d-flex justify-content-center align-items-center mt-10'>
      <SnackbarNotification type={toast.type} message={toast.message} onClose={handleCloseSnackbar} />
      <form className="products-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" height="80" />
        </div>
        <div className="products-column">
          <label>Product Name</label>
        </div>
        <div className="products-input-container mb-3">
          <input
            type="text"
            name="name"
            className="products-input"
            placeholder="Enter Product Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="products-column">
          <label>Product Price</label>
        </div>
        <div className="products-input-container mb-3">
          <input
            type="number"
            name="price"
            className="products-input"
            placeholder="Enter Product Price"
            step="0.01"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>
        <div className="products-column">
          <label>Product Rating</label>
        </div>
        <div className="products-input-container mb-3">
          <input
            type="number"
            name="rating"
            className="products-input"
            placeholder="Enter Product Rating"
            step="0.1"
            {...register("rating", { required: true, valueAsNumber: true })}
          />
        </div>
        <div className="products-column">
          <label>Product Image</label>
        </div>
        <div className="products-input-container border-0 mb-3" style={{ height: "150px" }}>
          {imageUrl ? (
            <div className="image-preview-container">
              <img src={imageUrl} alt="Product" width="100" className="img-fluid mb-2" />
              <button onClick={handleRemoveImage} className="btn btn-danger btn-sm mt-2">Remove</button>
            </div>
          ) : (
            <div
              className={`file-drop-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="file-drop-message">
                <p>Drag & Drop your files here</p>
                <span>or</span>
                <div className="custom-file">
                  <input
                    type="file"
                    name="image"
                    className="custom-file-input products-input"
                    id="customFile"
                    onChange={handleFileChange}
                    {...register("image")}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="products-button text-center w-100 my-2 fw-bold" type="submit">
          {id ? 'Edit Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;