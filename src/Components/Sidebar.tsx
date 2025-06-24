import React from "react";
import "./styles/Sidebar.css";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isLoggedIn, isAdmin, onLogout }) => {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <ul>
          <li>
            <Link to="/about" className="sidebar-link">About us</Link>
          </li>
          <li>
            <Link to="/product" className="sidebar-link">New In</Link>
          </li>
          <li><Link to="/product/category/Clothes" className="sidebar-link">Clothes</Link></li>
          <li><Link to="/product/category/Shoes" className="sidebar-link">Shoes</Link></li>
          <li><Link to="/product/category/Perfume" className="sidebar-link">Perfume</Link></li>
          <li><Link to="/product/category/Wallet" className="sidebar-link">Wallet</Link></li>
          <li><Link to="/product/category/Jewellery%20%26%20Watches" className="sidebar-link">Jewellery & Watches</Link></li>
          <li><Link to="/product/category/D%C3%A9cor%20%26%20Lifestyle" className="sidebar-link">Décor & Lifestyle</Link></li>

          {isLoggedIn && isAdmin && (
            <li>
              <Link to="/dashboard" className="sidebar-link"><u>Dashboard</u></Link>
            </li>
          )}

          {isLoggedIn ? (
            <li onClick={onLogout}>
              <u>Sign Out</u>
            </li>
          ) : (
            <li>
              <Link to="/login"><u>Sign In</u></Link>
            </li>
          )}
          <li><u>My Orders</u></li>
          <li><u>Contact Us</u></li>
          <li><u>+61 4201234567</u></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
