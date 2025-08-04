import React, { useState } from "react";
import Navbar from "./Navbar";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const error = await response.json();
        alert("Failed to send message: " + error.message);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      console.error("Submit error:", err);
    }
  };

  return (
    <>
      <Navbar scrolled={true} />
      <img
        src="./images/Landing.png"
        alt="Contact Us"
        className="contact-hero-image"
      />

      <div className="contact-page">
        <h1 className="contact-title">We’d love to hear from you</h1>
        <p className="contact-subtitle">Let us know how we can help you.</p>

        <div className="contact-box">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject *"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message *"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="primary-button">
              Send Message
            </button>

            {submitted && (
              <p className="success-message">
                Please check your email to verify the message.
              </p>
            )}
          </form>

          <div className="contact-info-box">
            <p><strong>Email us directly:</strong></p>
            <p>contact@ecocampus.com</p>

            <p className="quote">
              “We believe small actions spark meaningful change.”
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
