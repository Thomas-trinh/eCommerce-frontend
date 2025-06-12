import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./images/Logo.png";
import { FaShoppingBag, FaUser, FaSearch, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/contact" className="nav-link">+ Contact Us</Link>
      </div>

      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>
      </div>

      <div className="nav-right">
        <FaShoppingBag className="nav-icon" />
        <FaUser className="nav-icon" />
        <FaSearch className="nav-icon" />
        <div className="nav-menu">
          <FaBars className="nav-icon" />
          <span>MENU</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
