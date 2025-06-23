import React, { useEffect, useState } from "react";
import testImage from "./images/test.png";
import NewIn from "./images/NewIn.png"
import bookAppointment from "./images/BookAppointment.png";
import collect from "./images/Collect.png"
import personalisation from "./images/Personal.png"
import perfume from "./images/Perfume.png"
import Feature from "./images/Feature.png"
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./styles/Landing.css";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .zoom-in, .slide-up");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="body">
        <section className="hero-section zoom-in">
          <div className="hero-overlay">
            <h1 className="hero-title">T.ÉLÉGANCE</h1>
            <p className="hero-subtitle">Thomas Monogram Selection</p>
            <Link to="/product" className="hero-button">
              SHOP THE NEW STYLES
            </Link>
          </div>
        </section>

        {/* <div style={{ height: "5vh", background: "#fff" }}></div> */}

        <section className="collections-section fade-left delay-1">
          <div className="collection-item" style={{ backgroundImage: `url(${NewIn})` }}>
            <div className="collection-overlay">
              <h2>New In</h2>
              <button>SHOP THE COLLECTION</button>
            </div>
          </div>
          <div className="collection-item" style={{ backgroundImage: `url(${perfume})` }}>
            <div className="collection-overlay">
              <h2>Perfume</h2>
              <button>SHOP THE SELECTION</button>
            </div>
          </div>
        </section>

        {/* <h4 className="featured-label">FEATURED</h4> */}

        <section className="featured-section fade-up delay-2">
          <div className="featured-image">
            <img src={Feature} alt="Featured" />
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

        <section className="services-section slide-up delay-3">
          <h2 className="services-title">T.ÉLÉGANCE SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src={bookAppointment} alt="Book Appointment" />
              <h3>BOOK AN APPOINTMENT</h3>
              <p>
                Enjoy priority access to the boutique of your choice at the time and date that suits you. When you arrive,
                your Client Advisor will guide you through a hand-picked selection of pieces for you to try-on and style.
              </p>
              <a href="#">Book an In Store Appointment</a>
            </div>
            <div className="service-card">
              <img src={collect} alt="Collect In Store" />
              <h3>COLLECT IN STORE</h3>
              <p>
                Order online and collect your order from your preferred T.ÉLÉGANCE boutique.
              </p>
              <a href="#">Discover How</a>
            </div>
            <div className="service-card">
              <img src={personalisation} alt="Personalisation" />
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
