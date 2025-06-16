import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
