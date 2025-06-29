import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import "./styles/Product.css";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { Product, ProductImage } from "./interfaces/Products";


const Products = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string>("latest");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { isLoggedIn, isAdmin } = useAuth();

  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then((res) => {
        console.log("Response:", res.data);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setError("Unexpected data format");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/products?filter=${sort}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setError("Unexpected data format");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      });
  }, [sort]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar scrolled={true} />
      <div className="products-wrapper">
        <div className="main-banner">
          <h2 className="main-title">MEN'S NEW ARRIVALS</h2>
          <p className="main-subtitle">
            Men's new arrivals including clothing, shoes, bags, and accessories from the latest collection.
          </p>
        </div>

        <div className="product-sort-bar">
          <label htmlFor="sort" className="sort-label">Sort By</label>
          <select
            id="sort"
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high_price">Price: High to Low</option>
            <option value="low_price">Price: Low to High</option>
          </select>
        </div>


        {isLoggedIn && <h2>Welcome, {isAdmin ? "Admin" : "Back"}!</h2>}

        <div className="product-grid">
          {products.map((p) => (
            <Link to={`/products/${p.id}`} className="product-link" key={p.id}>
              <div className="product-card" key={p.id}>
                <div className="product-image-wrapper">
                  <div
                    className="product-image-wrapper"
                    onMouseEnter={() => setHoveredProductId(p.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <img
                      src={
                        hoveredProductId === p.id && p.images && p.images[1]?.image_url
                          ? p.images[1].image_url
                          : p.image_url || "/placeholder.jpg"
                      }
                      alt={p.name}
                      className="product-image"
                    />
                  </div>

                </div>
                <div className="product-info">
                  {/* <span className="product-category">{p.category}</span> */}
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">AU$ {p.price.toLocaleString()}</p>
                  {p.average_rating !== undefined && (
                    <p className="product-rating">⭐ {p.average_rating} / 5</p>
                  )}
                  <p>T.elegance Support Gardeners</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
