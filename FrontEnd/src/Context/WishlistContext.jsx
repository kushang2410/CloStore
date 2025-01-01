import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [toastConfig, setToastConfig] = useState(null);

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist:${user.token}`);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist:${user.token}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    if (!user) {
      setToastConfig({ type: 'error', message: 'You need to login to add products to the wishlist.' });
      return;
    }

    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
  };

  const resetToast = () => {
    setToastConfig(null);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toastConfig, resetToast }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};