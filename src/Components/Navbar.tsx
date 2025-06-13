import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./images/Logo.png";
import { FaShoppingBag, FaUser, FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
          <div className="nav-menu" onClick={() => setMenuOpen(true)}>
            <FaBars className="nav-icon" />
            <span style={{ cursor: "pointer" }}>MENU</span>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
