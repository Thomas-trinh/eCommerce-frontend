import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./styles/Verify.css";

const Verify = () => {
  const [message, setMessage] = useState("Verifying... Please do not refresh the page.");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    fetch(`http://localhost:4000/api/contact/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Verification failed. Please try again later."));
  }, []);

  return (
    <>
      <Navbar scrolled={true} />
      <div className="verify-page">
        <div className="verify-box">
          <h2>{message}</h2>
        </div>
      </div>
    </>
  );
};

export default Verify;
