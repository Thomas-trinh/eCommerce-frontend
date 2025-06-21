import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "./api/axiosClient";
import "./styles/AddProduct.css";

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const isFormComplete = productName && category && price && description && images.length > 0;

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages(prev => [...prev, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await axiosClient.post("/api/products/add", {
        name: productName,
        price,
        category,
        quantity,
        description,
        "img_urls[]": images,
      }) as { data: { message: string; redirect: string } };;
      setSuccess(`Product ${productName} added successfully!`);
      setTimeout(() => {
        navigate(res.data.redirect);
    }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Product adding failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="add-product-page">
        <h1>Add New Product</h1>
        <div className="form-container">
          <form className="add-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Clothes">Clothes</option>
              <option value="Shoes">Shoes</option>
              <option value="Perfume">Perfume</option>
              <option value="Wallet">Wallet</option>
              <option value="Jewellery & Watches">Jewellery & Watches</option>
              <option value="Décor & Lifestyle">Décor & Lifestyle</option>
            </select>


            <label>Price (AUD)</label>
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>Image URL(s)</label>
            <div className="image-input-group">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <button type="button" onClick={handleAddImage} className="add-image-btn">+ Add</button>
            </div>
            <ul className="image-preview-list">
              {images.map((url, index) => (
                <li key={index}>
                  <img src={url} alt={`preview-${index}`} />
                  <span>{url}</span>
                </li>
              ))}
            </ul>

            <ul className="quantity">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </ul>

            <label>Description</label>
            <textarea
              placeholder="Enter description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" disabled={!isFormComplete}>
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
