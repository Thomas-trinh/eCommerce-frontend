import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import "./styles/Footer.css";

const Footer = () => (
  <footer className="lux-footer">
    <div className="lux-footer-container">
      <div className="lux-footer-section brand">
        <h2>T.Élégance</h2>
        <p>Where elegance meets innovation.</p>
      </div>

      <div className="lux-footer-section">
        <h4>Customer Care</h4>
        <ul>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/contact">Shipping & Returns</a></li>
          <li><a href="/contact">FAQs</a></li>
        </ul>
      </div>

      <div className="lux-footer-section">
        <h4>About</h4>
        <ul>
          <li><a href="/about">Our Story</a></li>
          <li><a href="/about">Our Values</a></li>
          <li><a href="/contact">Careers</a></li>
        </ul>
      </div>

      <div className="lux-footer-section">
        <h4>Follow Us</h4>
        <div className="lux-social-icons">
          <a href="https://www.instagram.com/tung_wsu_ambassador/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com/profile.php?id=100086457210025" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.tiktok.com/@hoang.tung1611" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
        </div>
      </div>
    </div>

    <div className="lux-footer-bottom">
      <p>© {new Date().getFullYear()} T.Élégance — All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
