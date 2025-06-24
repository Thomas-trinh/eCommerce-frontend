import React, { useState } from "react";
import axiosClient from "./api/axiosClient";
import Navbar from "./Navbar";
import "./styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axiosClient.post<{ message: string }>("/reset-password", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
    <Navbar scrolled={true} />
    <div className="reset-request-page">
      <h2>Forgot your password?</h2>
      <p>Enter your email and we'll send you a link to reset it.</p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
    </>
  );
};

export default ResetPassword;
