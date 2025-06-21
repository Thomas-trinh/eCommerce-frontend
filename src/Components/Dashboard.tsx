import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "./api/axiosClient";
import { Product } from "./interfaces/Products";
import axios from "axios";
import Navbar from "./Navbar";
import "./styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosClient.delete(`/api/products/${productId}`);
      setProducts(prev => prev.filter(p => p.id !== productId)); // Update UI
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <>
      <Navbar></Navbar>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Product Dashboard</h2>
          <button onClick={() => navigate("/product/new")} className="add-btn">Add New Product</button>
        </div>

        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (AUD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5}>No products found.</td>
              </tr>
            )}
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td><img src={product.image_url} alt={product.name} width="60" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => navigate(`/product/edit/${product.id}`)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
