import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { Product } from "./interfaces/Products";
import "./styles/Product.css"; // Reuse the same style

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products?category=${encodeURIComponent(category || "")}`)
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
  }, [category]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar scrolled={true} />
      <div className="products-wrapper">
        <h2 className="main-title">{category} Collection</h2>
        <p className="main-subtitle">Discover more from our {category} collection</p>

        <div className="product-grid">
          {products.map((p) => (
            <Link to={`/products/${p.id}`} className="product-link" key={p.id}>
              <div className="product-card">
                <div
                  className="product-image-wrapper"
                  onMouseEnter={() => setHoveredProductId(p.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <img
                    src={
                      hoveredProductId === p.id && p.images?.[1]?.image_url
                        ? p.images[1].image_url
                        : p.image_url || "/placeholder.jpg"
                    }
                    alt={p.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
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

export default CategoryPage;
