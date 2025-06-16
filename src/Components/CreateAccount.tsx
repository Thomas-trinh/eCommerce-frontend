import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/Login.css";

const CreateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Navbar />
            <div className="account-page">
                <h1 className="account-title">MY ACCOUNT</h1>

                <div className="account-container">
                    <div className="login-left">
                        {/* Tab UI */}
                        <div className="tabs">
                            <Link to="/login" className="inactive-tab">LOGIN</Link>
                            <span className="active-tab">CREATE ACCOUNT</span>
                        </div>

                        <form className="login-form">
                            <label>User Name *</label>
                            <input type="text" placeholder="Enter your preferred name" />

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

                            <button className="primary-button">CREATE ACCOUNT</button>
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