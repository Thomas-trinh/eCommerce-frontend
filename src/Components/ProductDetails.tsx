import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "./interfaces/Products";
import { CommentWithRating } from "./interfaces/Rating";
import { ProductDetailsResponse } from "./interfaces/ProductDetailResponse";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { addToCart } from "./api/cartApi";
import "./styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<CommentWithRating[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(3);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const sizes = ["36", "38", "40", "42", "44", "46", "48", "50"];

  const { isLoggedIn } = useAuth();
  const [addMessage, setAddMessage] = useState("");

  const handleAdd = async (id: number) => {
    try {
      await addToCart(id);
      setAddMessage("Item added to cart!");
      setTimeout(() => setAddMessage(""), 2000);
    } catch (err) {
      setAddMessage("You must be logged in.");
      setTimeout(() => setAddMessage(""), 3000);
    }
  };


  useEffect(() => {
    axios
      .get<ProductDetailsResponse>(`http://localhost:4000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setReviews(res.data.reviews);


        if (res.data.product.category) {
          axios
            .get<Product[]>(`http://localhost:4000/api/products?category=${res.data.product.category}`)
            .then((relatedRes) => {
              const filtered = relatedRes.data.filter(p => p.id !== res.data.product.id);
              setRelatedProducts(filtered.slice(0, 4)); // show max 4
            })
            .catch((err) => console.error("Failed to load related products:", err));
        }
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar scrolled={true} />
      <div className="product-page">
        <div className={`product-images img-count-${product.images?.length || 1}`}>
          {product.images?.map((img, i) => (
            <img key={i} src={img.image_url} alt={img.alt_text ?? "Product Image"} />
          ))}
        </div>


        <div className="product-info">
          <div className="product-header">
            <h1 className="product-name">{product.name}</h1>
            {product.average_rating && !isNaN(parseFloat(product.average_rating)) && (
              <div className="product-rating">
                {[1, 2, 3, 4, 5].map((star) => {
                  const avg = parseFloat(product.average_rating ?? "0");
                  if (star <= Math.floor(avg)) return <span key={star} className="star full">★</span>;
                  else if (avg % 1 >= 0.5 && star === Math.ceil(avg)) return <span key={star} className="star half">☆</span>;
                  else return <span key={star} className="star empty">☆</span>;
                })}
                <span className="rating-value">{parseFloat(product.average_rating).toFixed(1)}</span>
                {reviews.length > 0 && (
                  <span className="review-count">({reviews.length})</span>
                )}
              </div>
            )}
          </div>

          <div className="product-price">AU$ {product.price}</div>
          <p className="product-description">{product.description}</p>

          <div className="size-selector">
            <label className="size-label">SELECT SIZE:</label>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-box ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="add-to-cart"
            disabled={!selectedSize || !product}
            onClick={() => handleAdd(product.id)}
          >

            {selectedSize ? "ADD TO SHOPPING BAG" : "SELECT SIZE FIRST"}
          </button>
          {addMessage && <p className="add-message">{addMessage}</p>}


          <div className="customer-reviews">
            <h2>Customer Reviews</h2>
            {Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((review, i) => (
                <div key={i} className="review">
                  <p><strong>Rating:</strong> {review.rating ?? 0} / 5</p>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star">
                        {star <= (review.rating ?? 0) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <p>{review.commenttext}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave a comment.</p>
            )}
          </div>

          {/* 1. Button to open review modal */}
          <button className="open-review-btn" onClick={() => setShowModal(true)}>
            Write a Review
          </button>


          {/* 2. Modal overlay (initially hidden via CSS) */}
          <div className={`review-modal-overlay ${showModal ? "" : "hidden"}`}>

            <div className="review-modal">
              <h2 className="modal-title">Your Review</h2>

              {/* 3. Scrollable Star Selector */}
              <div className="star-scroll">
                <div
                   className="stars-container"
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left; // Mouse X relative to container
                     const percent = x / rect.width;
                     const hoveredStars = Math.min(Math.max(Math.ceil(percent * 5), 1), 5);
                     setHoverRating(hoveredStars);
                   }}
                   onMouseLeave={() => setHoverRating(null)}
                   onClick={() => {
                     if (hoverRating !== null) setReviewRating(hoverRating);
                   }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star_review ${(hoverRating ?? reviewRating) >= star ? "active" : ""}`}>
                      {star <= reviewRating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="star-hint">Hover and press to adjust rating</p>
              </div>

              {/* 4. Review Textarea */}
              <textarea
                className="review-textarea"
                placeholder="Share your thoughts..."
              ></textarea>

              {/* 5. Submit Button */}
              <button className="submit-review-btn" onClick={() => setShowModal(false)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>You may also like</h2>
          <div className="related-carousel">
            {relatedProducts.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="related-link">
                <div className="related-card">
                  <img src={item.image_url} alt={item.name} />
                  <div className="related-info">
                    <p className="product-name">{item.name}</p>
                    <p className="product-price">AU$ {item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
