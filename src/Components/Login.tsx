import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosClient from "./api/axiosClient";
import "./styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axiosClient.post("/login", {
        email,
        password,
      });

      const { username } = res.data as { username: string };

      setSuccess("Login successful! Redirecting...");

      // Delay redirect slightly for UX feedback
      setTimeout(() => {
        navigate(`/product?user=${encodeURIComponent(username)}`);
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

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

            <form className="login-form" onSubmit={handleLogin}>
              <label>Email *</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <div className="options-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/reset-password">Forgot Password?</Link>
              </div>

              <button className="primary-button" type="submit">
                SIGN-IN AND CONTINUE
              </button>

              <a href="http://localhost:4000/auth/google">
              <button
                type="button"
                className="google-button"
                onClick={() => window.alert("Coming soon")}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="google-icon"
                />
                Sign in with Google
              </button>
              </a>

              <p className="privacy">
                I have read and accept the T.ÉLÉGANCE <a href="#">Privacy Policy</a>.
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