import React from "react";
import "./styles/Sidebar.css";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <ul>
        <li>About us</li>
          <li>
            <Link to="/product" className="sidebar-link">New In</Link>
          </li>
          <li>Clothes</li>
          <li>Shoes</li>
          <li>Perfume</li>
          <li>Wallet</li>
          <li>Jewellery & Watches</li>
          <li>Décor & Lifestyle</li>
          <li><u>Sign In</u></li>
          <li><u>My Orders</u></li>
          <li><u>Contact Us</u></li>
          <li><u>+61 4201234567</u></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
