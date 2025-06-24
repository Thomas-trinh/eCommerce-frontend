import React, { useState, useEffect } from "react";
import axiosClient from "./api/axiosClient";
import Navbar from "./Navbar";
import { CartItem } from "./interfaces/CartItem";

const Payment = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosClient.get<{ products: CartItem[] }>("/shoppingCart");
        setCartItems(res.data.products);
      } catch (err) {
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleStripeCheckout = async () => {
    try {
      const res = await axiosClient.post<{ url: string }>("/api/payment/create-checkout-session", {
        items: cartItems,
      });
      window.location.href = res.data.url;
    } catch (err) {
      setError("Payment initialization failed.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Navbar scrolled={true} />
      <div className="payment-page">
        <h1>Review and Pay</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="error">{error}</div>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="payment-content">
            <div className="payment-items">
              {cartItems.map(item => (
                <div key={item.id} className="payment-item">
                  <img src={item.image_url} alt={item.name} />
                  <div>
                    <p>{item.name} x {item.quantity}</p>
                    <p>AU${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="payment-summary">
              <h3>Total: AU${total}</h3>
              <button className="pay-button" onClick={handleStripeCheckout}>
                Pay with Card
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
