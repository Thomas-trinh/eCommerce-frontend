import React from "react";
import Navbar from "./Navbar";
import "./styles/About.css";
import founderImage from "./images/founder.jpg";

const About = () => {
  return (
    <>
      <Navbar scrolled={true} />
      <div className="about-page">
        <div className="about-content">
          <div className="about-text">
            <h1>Meet Our Founder</h1>
            <h2>Thomas Trinh</h2>
            <p>
              Driven by passion, elegance, and an uncompromising attention to detail,
              Thomas Trinh founded T.Élégance with a vision to redefine modern luxury.
              With a background in software and a flair for design, he blends 
              technology and timeless aesthetics into every collection.
            </p>
            <p>
              At T.Élégance, we believe fashion is not just about what you wear—it's 
              about how you carry yourself. Join us as we continue to craft experiences 
              that elevate confidence, identity, and style.
            </p>
          </div>
          <div className="about-image">
            <img src={founderImage} alt="Thomas Trinh - Founder" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
