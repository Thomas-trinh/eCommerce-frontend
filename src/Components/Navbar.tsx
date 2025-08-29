import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./images/Logo.png";
import { FaShoppingBag, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./Sidebar";
import axiosClient from "./api/axiosClient";

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.get("/logout");
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetch("http://localhost:4000/user/checkToken", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setIsLoggedIn(true);
          setIsAdmin(data.user.username.toLowerCase() === "admin"); // or use data.user.isAdmin if DB provides it
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      })
      .catch((err) => console.log("Not logged in:", err));
  }, []);

  return (
    <>
      <nav className={`nav ${!scrolled ? "nav-transparent" : "nav-scrolled"}`}>
        <div className="nav-left">
          <Link to="/contact" className="nav-link">+ Contact Us</Link>
        </div>

        <div className="nav-center">
          <Link to="/">
            <h1 className={`nav-logo-text ${scrolled ? "shrink" : ""}`}>T.Élégance</h1>
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/cart">
            <FaShoppingBag className="nav-icon" />
          </Link>
          {/* <FaUser className="nav-icon" /> */}
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
