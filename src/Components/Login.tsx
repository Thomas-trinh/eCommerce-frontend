import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Navbar />
      <div className="account-page">
        <h1 className="account-title">MY ACCOUNT</h1>

        <div className="account-container">
          <div className="login-left">
            <div className="tabs">
              <span className="active-tab">LOGIN</span>
              <Link to="/create-account" className="inactive-tab">CREATE ACCOUNT</Link>
            </div>

            <form className="login-form">
              <label>Email *</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="options-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>

              <button className="primary-button">SIGN-IN AND CONTINUE</button>

              <button className="google-button">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="google-icon"
                />
                Sign in with Google
              </button>

              <p className="privacy">
                I have read and accept the Gucci <a href="#">Privacy Policy</a>.
              </p>
            </form>
          </div>

          <div className="login-right">
            <div className="benefit-content">
              <h2>JOIN MY T.ÉLÉGANCE</h2>

              <div className="benefit-block">
                <strong>TRACK YOUR ORDERS</strong>
                <p>Follow your orders every step of the way.</p>
              </div>

              <div className="benefit-block">
                <strong>STREAMLINE CHECKOUT</strong>
                <p>Check out faster with saved addresses and payment methods.</p>
              </div>

              <div className="benefit-block">
                <strong>BOOK AN APPOINTMENT</strong>
                <p>
                  Enjoy priority access to the boutique of your choice at the time and
                  date that suits you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;