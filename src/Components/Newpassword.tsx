import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "./api/axiosClient";
import "./styles/NewPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axiosClient.post<{ message: string }>("/new-password", {
                token,
                newPassword,
            });

            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Password reset failed.");
        }
    };

    return (
        <div className="reset-page">
            <h2>Reset Your Password</h2>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <span
                    className="eye-icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default NewPassword;
