import React, { useEffect, useState, useRef } from "react";
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
  const collectionRefs = useRef<HTMLDivElement[]>([]);
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  const collectionItems = [
    { title: "New In", image: NewIn, btnText: "SHOP THE COLLECTION" },
    { title: "Perfume", image: perfume, btnText: "SHOP THE SELECTION" },
  ];
  
  const newInRef = useRef<HTMLDivElement>(null);
  const newInBtnRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateButtonPositions = () => {
      collectionRefs.current.forEach((image, index) => {
        const button = buttonRefs.current[index];
        if (!image || !button) return;
    
        const rect = image.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
    
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    
        if (isVisible) {
          button.classList.add("visible");
    
          // Nút vẫn được đặt vị trí theo centerY để tạo hiệu ứng
          const fadeInStart = rect.top + rect.height * -0.2;
          const fadeInEnd = rect.top + rect.height * 0.5;
          const progress = Math.min(
            1,
            Math.max(0, (centerY - fadeInStart) / (fadeInEnd - fadeInStart))
          );
    
          const minTop = rect.height * 0.25 + 120;
          const maxTop = rect.height * 0.75 + 50;
          const top = minTop + (maxTop - minTop) * progress;
          button.style.top = `${top}px`;
        } else {
          button.classList.remove("visible");
        }
      });
    };
    
  
    const onScroll = () => requestAnimationFrame(updateButtonPositions);
  
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateButtonPositions);
    updateButtonPositions();
  
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtonPositions);
    };
  }, []);
  
  return (
    <>
      <Navbar scrolled={scrolled}></Navbar>
      <div className="body">
        <section className="hero-section zoom-in">
          <div className="hero-overlay">
            {/* <h1 className="hero-title">T.ÉLÉGANCE</h1> */}
            <p className="hero-subtitle">Thomas Monogram Selection</p>
            <Link to="/product" className="hero-button">
              SHOP THE NEW STYLES
            </Link>
          </div>
        </section>

        {/* <div style={{ height: "5vh", background: "#fff" }}></div> */}

        <section className="collections-section fade-left delay-1">
  {collectionItems.map((item, index) => (
    <div
      key={index}
      className="collection-item"
      style={{ backgroundImage: `url(${item.image})` }}
      ref={(el) => {
        if (el) collectionRefs.current[index] = el;
      }}
    >
      <div
        className="collection-overlay dynamic"
        ref={(el) => {
          if (el) buttonRefs.current[index] = el;
        }}
      >
        <h2>{item.title}</h2>
        <button>{item.btnText}</button>
      </div>
    </div>
  ))}
</section>


        {/* <h4 className="featured-label">FEATURED</h4> */}

        <section className="featured-section fade-up delay-2">
          <div className="featured-image">
          <img src={Feature} alt="Featured" style={{ width: '500px', height: '600px' }} />

          </div>
          <div className="featured-text">
            <h4 className="featured-label">FEATURED</h4>
            <h2 className="featured-title">THOMAS OBSESSION</h2>
            <p className="featured-desc">
              A series of curated moments spotlight Eira Nguyen in a new campaign
              celebrating the House’s signature monogram in Sydney.
            </p>
            <a href="/product" className="featured-link">Discover More</a>
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
              <a href="/contact">Book an In Store Appointment</a>
            </div>
            <div className="service-card">
              <img src={collect} alt="Collect In Store" />
              <h3>COLLECT IN STORE</h3>
              <p>
                Order online and collect your order from your preferred T.ÉLÉGANCE boutique.
              </p>
              <a href="/contact">Discover How</a>
            </div>
            <div className="service-card">
              <img src={personalisation} alt="Personalisation" />
              <h3>PERSONALISATION</h3>
              <p>
                Emboss select bags, luggage, belts, leather accessories, and items from the pet’s collection with initials to create a truly unique piece.
              </p>
              <a href="/contact">Discover The Collection</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
