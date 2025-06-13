import React, { useEffect, useState } from "react";
import testImage from "./images/test.png";
import Navbar from "./Navbar";
import "./styles/Landing.css";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="body">
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">T.ÉLÉGANCE</h1>
          <p className="hero-subtitle">Thomas Monogram Selection</p>
          <button className="hero-button">SHOP THE NEW STYLES</button>
        </div>
      </section>

      {/* <div style={{ height: "5vh", background: "#fff" }}></div> */}

      <section className="collections-section">
        <div className="collection-item" style={{ backgroundImage: `url(${testImage})` }}>
          <div className="collection-overlay">
            <h2>New In</h2>
            <button>SHOP THE COLLECTION</button>
          </div>
        </div>
        <div className="collection-item" style={{ backgroundImage: `url(${testImage})` }}>
          <div className="collection-overlay">
            <h2>Perfume</h2>
            <button>SHOP THE SELECTION</button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Landing;
