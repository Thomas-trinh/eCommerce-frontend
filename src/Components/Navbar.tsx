import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./images/Logo.png";
import { FaShoppingBag, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./Sidebar";
import axiosClient from "./api/axiosClient";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await axiosClient.post("/logout");
    setIsLoggedIn(false);
    setIsAdmin(false); // Also reset admin status
    navigate("/login");
  };

  useEffect(() => {
    fetch("http://localhost:4000/checkToken", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          if (data.userName === "admin") {
            setIsAdmin(true);
          }
        }
      })
      .catch((err) => console.log("Not logged in:", err));
  }, []);

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
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
