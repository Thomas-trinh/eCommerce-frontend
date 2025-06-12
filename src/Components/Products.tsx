import React, { useEffect, useState } from "react";
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
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setError("Unexpected data format");
        }
      })
      .catch(() => {
        setError("Failed to load products");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Price: ${p.price}</p>
          <p>{p.description}</p>
          <p>Category: {p.category}</p>
          <p>Quantity: {p.quantity}</p>
          {p.average_rating && <p>Rating: {p.average_rating}</p>}
          {p.image_url && <img src={p.image_url} alt={p.name} />}
        </div>
      ))}
    </div>
  );
};

export default Products;
