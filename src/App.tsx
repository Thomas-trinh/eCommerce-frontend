import React from "react";
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

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="product/new" element={<AddProduct/>} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
