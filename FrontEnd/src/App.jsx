import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/CartContext";
import { OrderProvider } from "./Context/OrderContext";
import AppContent from "./AppContent";

const App = () => {
  return (
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <Router>
                <AppContent />
              </Router>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>

  );
};

export default App;