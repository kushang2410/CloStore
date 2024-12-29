import React from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import NavBar from "./Components/header/NavBar";
import MobileHeader from "./Components/MobileHeader/MobileHeader";
import Footer from "./Components/Footer/Footer";
import VerifyOTP from "./Components/VerifyOTP/VerifyOTP";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Home from "./pages/Home/Home";
import ProductForm from "./Components/ProductForm/ProductForm";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import MyCart from "./pages/MyCart/MyCart";
import Account from "./pages/Account/Account";
import AllUser from "./Components/AllUser/AllUser";
import ProductsView from "./Components/ProductsView/ProductsView";
import Wishlist from "./pages/Wishlist/Wishlist";
import CheckOut from "./pages/CheckOut/CheckOut";
import Order from "./pages/Order/Order";
import Marquee from "./Components/marquee/Marquee";
import useMediaQuery from "./useMediaQuery";

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isDesktop = useMediaQuery("(min-width: 991.98px)");

  const shouldShowNavBar = ![
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/change-password"
  ].includes(location.pathname);

  return (
    <>
      {/* <Marquee /> */}
      {shouldShowNavBar && (
        <>
          {isDesktop ? (
            <NavBar />
          ) : (
            <MobileHeader />
          )}
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/alluser" element={user && user.role === 'mainAdmin' ? <AllUser user={user} /> : <div>Access denied: User is not an admin</div>} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Order />} />
        <Route path="/productform" element={<ProductForm />} />
        <Route path="/productview" element={<ProductsView />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
      </Routes>
      {shouldShowNavBar && <Footer />}
    </>
  );
};

export default AppContent;