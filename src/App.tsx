import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import store from "./Components/redux/store";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Dashboard from "./Components/Dashboard";
import Payment from "./Components/Payment";
import CreateAccount from "./Components/CreateAccount";
import About from "./Components/About";
import NewPassword from "./Components/Newpassword";
import ResetPassword from "./Components/Resetpassword";
import { AuthProvider } from "./Components/context/AuthContext";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import StripeWrapper from "./Components/StripeWrapper";
import CategoryPage from "./Components/CategoryPage";
import Contact from "./Components/Contact";
import Verify from "./Components/Verify";

function App() {
  const [refreshAuth, setRefreshAuth] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("logged_in")) {
      setRefreshAuth((prev) => prev + 1);
    }
  }, []);

  return (
    <AuthProvider key={refreshAuth}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/category/:category" element={<CategoryPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<StripeWrapper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="product/new" element={<AddProduct />} />
          <Route path="/products/:id/updates" element={<EditProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
