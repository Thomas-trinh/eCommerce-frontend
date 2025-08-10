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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await axiosClient.post("/login", { email, password });
      const { username } = res.data as { username: string };
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate(`/product?user=${encodeURIComponent(username)}`), 800);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = email.trim() !== "" && password.trim() !== "" && !submitting;

  return (
    <>
      <Navbar scrolled={true} />
      <div className="account-page">
        <h1 className="account-title">MY ACCOUNT</h1>

        <div className="account-container">
          <div className="login-left">
            <div className="tabs">
              <span className="active-tab" aria-current="page">LOGIN</span>
              <Link to="/create-account" className="inactive-tab">CREATE ACCOUNT</Link>
            </div>

            <form className="login-form" onSubmit={handleLogin} noValidate>
              <label htmlFor="email-input">Email *</label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                inputMode="email"
              />

              <label htmlFor="password-input">Password *</label>
              <div className="password-wrapper">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <div className="msg-row" aria-live="polite">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
              </div>

              <div className="options-row">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/reset-password">Forgot Password?</Link>
              </div>

              <button className="primary-button" type="submit" disabled={!canSubmit}>
                {submitting ? "SIGNING IN..." : "SIGN-IN AND CONTINUE"}
              </button>

              {/* Keep Google as a link (server handles OAuth) */}
              <a href="http://localhost:4000/auth/google" className="google-button">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt=""
                  aria-hidden="true"
                  className="google-icon"
                />
                Sign in with Google
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
                <p>Enjoy priority access to the boutique of your choice at your preferred time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
