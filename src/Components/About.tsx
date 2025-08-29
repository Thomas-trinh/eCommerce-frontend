import React from "react";
import Navbar from "./Navbar";
import "./styles/About.css";
import founderImage from "./images/founder.jpg";
import { FaLinkedin, FaGithub, FaYoutube, FaDownload } from "react-icons/fa";

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

            {/* Social Buttons */}
            <div className="about-buttons">
              <a 
                href="https://www.linkedin.com/in/thomas-trinh-55543424b/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-btn linkedin"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a 
                href="https://github.com/Thomas-trinh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-btn github"
              >
                <FaGithub /> GitHub
              </a>
              <a 
                href="https://www.youtube.com/@hoangtungofficial1611" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-btn youtube"
              >
                <FaYoutube /> YouTube
              </a>
              <a 
                href="/Thomas-resume.pdf" 
                download="Thomas-resume.pdf" 
                className="about-btn resume"
              >
                <FaDownload /> Resume
              </a>
            </div>
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
