// Sidebar.tsx
import React from "react";
import "./styles/Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <ul>
        <li>New In</li>
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
  );
};

export default Sidebar;
