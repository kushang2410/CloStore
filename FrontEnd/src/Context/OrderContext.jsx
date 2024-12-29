import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      const storedOrders = localStorage.getItem(`orders:${user.token}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem(`orders:${user.token}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const placeOrder = (newOrder) => {
    if (!newOrder.orderId) {
      newOrder.orderId = Date.now().toString();
    }
    setOrders([...orders, newOrder]);
    clearCart();
  };

  const cancelOrder = (orderId) => {
    setOrders(orders.filter(order => order.orderId !== orderId));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};