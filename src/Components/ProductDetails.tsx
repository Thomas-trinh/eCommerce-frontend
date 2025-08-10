import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Product } from "./interfaces/Products";
import { CommentWithRating } from "./interfaces/Rating";
import { ProductDetailsResponse } from "./interfaces/ProductDetailResponse";
import Navbar from "./Navbar";
import { useAuth } from "./context/AuthContext";
import { addToCart } from "./api/cartApi";
import "./styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<CommentWithRating[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false); // review modal
  const [reviewRating, setReviewRating] = useState(3);
  const [reviewText, setReviewText] = useState<string>("");
  const [filter, setFilter] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const sizes = ["36", "38", "40", "42", "44", "46", "48", "50"];

  const { isLoggedIn, loading } = useAuth();
  const [addMessage, setAddMessage] = useState("");

  // NEW: lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleAdd = async (pid: number) => {
    if (loading) return;
    if (!isLoggedIn) {
      setAddMessage("You must be logged in.");
      setTimeout(() => setAddMessage(""), 3000);
      return;
    }
    try {
      await addToCart(pid);
      setAddMessage("Item added to cart!");
      setTimeout(() => setAddMessage(""), 2000);
    } catch {
      setAddMessage("Something went wrong.");
      setTimeout(() => setAddMessage(""), 3000);
    }
  };

  useEffect(() => {
    axios
      .get<CommentWithRating[]>(`http://localhost:4000/api/products/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/products/${id}/reviews`,
        { reviewText, rating: reviewRating },
        { withCredentials: true }
      );

      setShowModal(false);
      setReviewText("");

      const reviewsRes = await axios.get<CommentWithRating[]>(
        `http://localhost:4000/api/products/${id}/reviews`
      );
      setReviews(reviewsRes.data);

      const productRes = await axios.get<ProductDetailsResponse>(
        `http://localhost:4000/api/products/${id}`
      );
      setProduct(productRes.data.product);

      setAddMessage("Review submitted successfully");
      setTimeout(() => setAddMessage(""), 3000);
    } catch (err) {
      console.error("Submit failed: ", err);
      setAddMessage("Submit failed. Have you logged in yet?");
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
              const filtered = relatedRes.data.filter((p) => p.id !== res.data.product.id);
              setRelatedProducts(filtered.slice(0, 4));
            })
            .catch((err) => console.error("Failed to load related products:", err));
        }
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((r) => filter === 0 || r.rating === filter).slice(0, 5)
    : [];

  // NEW: lightbox helpers
  const imageUrls =
    product?.images?.map((i) => i.image_url).filter(Boolean) ??
    (product?.image_url ? [product.image_url] : []);

  const openLightbox = (index: number) => {
    if (!imageUrls.length) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImg = () => setLightboxIndex((i) => (i + 1) % imageUrls.length);
  const prevImg = () => setLightboxIndex((i) => (i - 1 + imageUrls.length) % imageUrls.length);

  // keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, imageUrls.length]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar scrolled={true} />
      <div className="product-page">
        <div className={`product-images img-count-${product.images?.length || 1}`}>
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img.image_url}
              alt={img.alt_text ?? `Product Image ${i + 1}`}
              className="pd-clickable"
              onClick={() => openLightbox(i)}
            />
          ))}
          {!product.images?.length && product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="pd-clickable"
              onClick={() => openLightbox(0)}
            />
          )}
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
                {reviews.length > 0 && <span className="review-count">({reviews.length})</span>}
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

            <div className="review-filter">
              <label>Filter by rating:</label>
              <select onChange={(e) => setFilter(Number(e.target.value))} value={filter}>
                <option value={0}>All</option>
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>{star} stars</option>
                ))}
              </select>
            </div>

            <div className="review-list">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, i) => (
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
          </div>

          <button
            className="open-review-btn"
            onClick={() => {
              if (isLoggedIn) {
                setShowModal(true);
              } else {
                setAddMessage("You must sign in to write a review");
                setTimeout(() => setAddMessage(""), 3000);
              }
            }}
          >
            Write a Review
          </button>

          {/* Review modal */}
          <div className={`review-modal-overlay ${showModal ? "" : "hidden"}`}>
            <div className="review-modal" role="dialog" aria-modal="true" aria-label="Write a review">
              <h2 className="modal-title">Your Review</h2>

              <div className="star-scroll">
                <div
                  className="stars-container"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
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
                    <span
                      key={star}
                      className={`star_review ${(hoverRating ?? reviewRating) >= star ? "active" : ""}`}
                    >
                      {star <= reviewRating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="star-hint">Hover and press to adjust rating</p>
              </div>

              <textarea
                className="review-textarea"
                placeholder="Share your thoughts..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button className="submit-review-btn" onClick={handleReviewSubmit}>Submit</button>
              <button className="lightbox-close review-close" onClick={() => setShowModal(false)} aria-label="Close review modal">×</button>
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

      {/* NEW: Lightbox modal */}
      {lightboxOpen && imageUrls.length > 0 && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Product image preview"
          onClick={closeLightbox}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageUrls[lightboxIndex]} className="lightbox-img" alt={`Preview ${lightboxIndex + 1}`} />
            {imageUrls.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={prevImg} aria-label="Previous image">‹</button>
                <button className="lightbox-nav lightbox-next" onClick={nextImg} aria-label="Next image">›</button>
              </>
            )}
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">×</button>
            <div className="lightbox-counter">{lightboxIndex + 1} / {imageUrls.length}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
