import React, { useEffect, useState } from "react";
import "./styles/Landing.css";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">T.ÉLÉGANCE</h1>
          <p className="hero-subtitle">Thomas Monogram Selection</p>
          <button className="hero-button">SHOP THE NEW STYLES</button>
        </div>
      </section>

      {/* Just placeholder content */}
      <div style={{ height: "150vh", background: "#fff" }}></div>
    </div>
  );
};

export default Landing;
