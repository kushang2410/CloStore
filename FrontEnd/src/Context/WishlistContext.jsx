import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

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
    setWishlist(prevWishlist => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};