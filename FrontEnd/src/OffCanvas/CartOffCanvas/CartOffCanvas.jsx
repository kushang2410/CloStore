import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useCart } from "../../Context/CartContext";
import EmptyCart from '../../assets/images/svg/cart-empty.svg';
import SnackbarNotification from '../../Components/SnackbarNotification/SnackbarNotification';
import './style.css'

const CartOffCanvas = ({ show, onHide }) => {
  const { cart, removeFromCart, updateCartItemQuantity, getTotal } = useCart();
  const location = useLocation();
  const cartButtonRef = useRef(null);
  const offcanvasRef = useRef(null);
  const [toastConfig, setToastConfig] = useState(null);

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    setToastConfig({ type: 'info', message: 'Product removed from cart' });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      setToastConfig({ type: 'info', message: 'Product removed from cart' });
    } else {
      updateCartItemQuantity(itemId, newQuantity);
      setToastConfig({ type: 'success', message: 'Quantity updated' });
    }
  };

  const total = getTotal();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        show &&
        cartButtonRef.current &&
        offcanvasRef.current &&
        !cartButtonRef.current.contains(event.target) &&
        !offcanvasRef.current.contains(event.target)
      ) {
        onHide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location, onHide, show]);

  const handleCloseSnackbar = () => {
    setToastConfig(null);
  };

  return (
    <div ref={offcanvasRef} className={`offcanvas offcanvas-end custom-offcanvas position-fixed ${show ? 'show' : ''}`} tabIndex="-1" id="cartOffCanvas" aria-labelledby="cartOffCanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartOffCanvasLabel">Shopping Cart</h5>
      </div>
      <div className="offcanvas-body custom-scrollbar me-3" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {cart.length === 0 ? (
          <div className="text-center mt-5">
            <img src={EmptyCart} alt="" width="120px" />
            <div className="fs-5 my-4">
              Your cart is currently empty.
            </div>
          </div>
        ) : (
          cart.map((item, index) => {
            const imageUrl = `https://clostore1.onrender.com/${item.image.replace(/\\/g, '/')}`;
            const subtotal = item.price * item.quantity;

            return (
              <div key={item._id} className="mb-3">
                <div className="d-flex align-items-center position-relative">
                  <img src={imageUrl} alt={item.name} style={{ width: "100px", marginRight: "10px" }} />
                  <div>
                    <h6>{item.name}</h6>
                    <p>₹{item.price}</p>
                    <div className="d-flex align-items-center border border-2 rounded-5">
                      <button className="btn" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                      <input type="number" className="form-control border border-0 ps-4" value={item.quantity} min="1" max="10" step="1"
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        style={{ width: "60px", textAlign: "center" }} />
                      <button className="btn" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                      <button className="border border-0 bg-transparent position-absolute top-0 end-0" onClick={() => handleRemove(item._id)}><MdOutlineDeleteForever />
                      </button>
                    </div>
                  </div>
                  <p className="mt-9 ms-5 text-end"> ₹{subtotal.toFixed(2)}</p>
                </div>
                {index < cart.length - 1 && <hr />}
              </div>
            );
          })
        )}
      </div>
      <hr />
      {cart.length > 0 && (
        <>
          <div className="my-2 mx-4 w-90 d-flex justify-content-between align-items-center">
            <span className="fs-5">SubTotal:</span>
            <span className="fs-5"> ₹{total.toFixed(2)}</span>
          </div>
          <div className="offcanvas-footer my-2">
            <Link to="/mycart" className="custom-btn wdt-button-3 rounded-5 w-90 mx-4 py-2 d-inline-block text-center fs-6" onClick={onHide}>View Cart</Link>
          </div>
          <div className="offcanvas-footer mt-2 mb-3">
            <Link to="/checkout" className="custom-btn wdt-button-3 rounded-5 w-90 mx-4 py-2 d-inline-block text-center fs-6" onClick={onHide}>CheckOut</Link>
          </div>
        </>
      )}
      {toastConfig && <SnackbarNotification type={toastConfig.type} message={toastConfig.message} onClose={handleCloseSnackbar} />}
    </div>
  );
};

export default CartOffCanvas;