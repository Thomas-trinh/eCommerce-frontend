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

        <section className="featured-section">
          <div className="featured-image">
            <img src={testImage} alt="Featured" />
          </div>
          <div className="featured-text">
            <h4 className="featured-label">FEATURED</h4>
            <h2 className="featured-title">THOMAS OBSESSION</h2>
            <p className="featured-desc">
              A series of curated moments spotlight Eira Nguyen in a new campaign
              celebrating the House’s signature monogram in Sydney.
            </p>
            <a href="#" className="featured-link">Discover More</a>
          </div>
        </section>

        <section className="services-section">
          <h2 className="services-title">GUCCI SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src={testImage} alt="Book Appointment" />
              <h3>BOOK AN APPOINTMENT</h3>
              <p>
                Enjoy priority access to the boutique of your choice at the time and date that suits you. When you arrive,
                your Client Advisor will guide you through a hand-picked selection of pieces for you to try-on and style.
              </p>
              <a href="#">Book an In Store Appointment</a>
            </div>
            <div className="service-card">
              <img src={testImage} alt="Collect In Store" />
              <h3>COLLECT IN STORE</h3>
              <p>
                Order online and collect your order from your preferred Gucci boutique.
              </p>
              <a href="#">Discover How</a>
            </div>
            <div className="service-card">
              <img src={testImage} alt="Personalisation" />
              <h3>PERSONALISATION</h3>
              <p>
                Emboss select bags, luggage, belts, leather accessories, and items from the pet’s collection with initials to create a truly unique piece.
              </p>
              <a href="#">Discover The Collection</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
