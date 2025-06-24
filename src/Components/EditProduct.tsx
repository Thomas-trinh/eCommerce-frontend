import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "./api/axiosClient";
import Navbar from "./Navbar";
import "./styles/EditProduct.css";
import { Product } from "./interfaces/Products";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get<{ product: Product }>(`/api/products/${id}`);
        const p = res.data.product;
        setProductName(p.name);
        setCategory(p.category || "");
        setPrice(p.price.toString());
        setQuantity(p.quantity.toString());
        setDescription(p.description);
        setImages(p.images?.map((img) => img.image_url) || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Product not found.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages(prev => [...prev, imageInput.trim()]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
  
    try {
      const res = await axiosClient.post(`/api/products/${id}/updates`, {
        name: productName,
        category,
        price,
        quantity,
        description,
        "img_urls[]": images,
      });
  
      setMessage("Product updated successfully!");
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
  
    } catch (error: any) {
      console.error("Update failed:", error?.response?.data || error.message);
      setMessage("Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
      <Navbar scrolled={true} />
      <div className="edit-product-page">
        <h1>Edit Product</h1>
        <div className="form-container">
          {message && <p className="info-message">{message}</p>}
          <form className="edit-form" onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />

            <label>Image URLs</label>
            <div className="image-input-group">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <button type="button" onClick={handleAddImage}>+ Add</button>
            </div>
            <ul className="image-preview-list">
              {images.map((url, index) => (
                <li key={index}>
                  <img src={url} alt={`img-${index}`} />
                  <span>{url}</span>
                  <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
