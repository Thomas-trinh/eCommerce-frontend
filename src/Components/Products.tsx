import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./styles/Product.css";
import axios from "axios";

interface ProductImage {
  image_url: string;
  alt_text: string | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  image_url?: string;
  images?: ProductImage[];
  average_rating?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
  

  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar></Navbar>
    <div className="products-wrapper">
      <h2 className="main-title">MEN'S NEW ARRIVALS</h2>
      <p className="main-subtitle">
        Men's new arrivals including clothing, shoes, bags, and accessories from the latest collection.
      </p>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-image-wrapper">
              <img src={p.image_url || "/placeholder.jpg"} alt={p.name} className="product-image" />
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
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
