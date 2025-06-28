import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosClient from "./api/axiosClient";
import "./styles/Login.css";

const CreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true); // disable button

        try {
            const res = await axiosClient.post("/register", {
                username,
                email,
                password,
            });

            setSuccess("Account created successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar scrolled={true} />
            <div className="account-page">
                <h1 className="account-title">MY ACCOUNT</h1>

                <div className="account-container">
                    <div className="login-left">
                        <div className="tabs">
                            <Link to="/login" className="inactive-tab">LOGIN</Link>
                            <span className="active-tab">CREATE ACCOUNT</span>
                        </div>

                        {/* <form className="login-form"> */}
                        <form className="login-form" onSubmit={handleRegister}>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}

                            <label>User Name *</label>
                            <input
                                type="text"
                                placeholder="Enter your preferred name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

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
                                    placeholder="Create a password"
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
                            <div className="options-row vertical">
                                <label>
                                    <input type="checkbox" />
                                    <span>
                                        &nbsp;Yes, sign me up for the T.Élégance Newsletter. I
                                        confirm I am over 16 years old. I would like to receive
                                        digital communications (email and SMS) from T.Élégance
                                        about products and exclusive offers.
                                    </span>
                                </label>
                            </div>

                            <button className="primary-button" disabled={isSubmitting}>
                                {isSubmitting ? "Creating Account..." : "CREATE ACCOUNT"}
                            </button>

                            <button className="google-button">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="google-icon"
                                />
                                Sign in with Google
                            </button>

                            <p className="privacy">
                                I have read and accept the T.Élégance <a href="#">Privacy Policy</a>.
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

export default CreateAccount;