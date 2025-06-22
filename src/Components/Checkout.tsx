import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axiosClient from "./api/axiosClient";
import Navbar from "./Navbar";
import { CartItem } from "./interfaces/CartItem";
import { CartResponse } from "./interfaces/CartResponse";
import "./styles/Checkout.css";

const Checkout = () => {
  const [form, setForm] = useState({ fullName: "", address: "", city: "", state: "", zip: "", country: "Australia" });
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState("0.00");
  const [clientSecret, setClientSecret] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const res = await axiosClient.get<CartResponse>("/checkout");
        setItems(
          res.data.products.map((product) => ({
            ...product,
            image_url: product.image_url || "",
          }))
        );
        setTotal((res.data.totalPrice ?? 0).toFixed(2));
        const paymentRes = await axiosClient.post("/api/payment/create-checkout-session", { items: res.data.products });
      } catch (err) {
        console.error("Failed to load checkout data:", err);
      }
    };
    fetchCheckoutData();
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedirecting(true);
  
    try {
      const res = await axiosClient.post<{ url: string }>("/api/payment/create-checkout-session", {
        items,
      });
  
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Failed to initiate Stripe Checkout:", err);
      setError("Something went wrong. Please try again.");
      setRedirecting(false);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="checkout-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Information</h2>
            {/* Shipping fields */}
            {["fullName", "address", "city", "state", "zip"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                required
                value={(form as any)[field]}
                onChange={handleChange}
              />
            ))}
            <input name="country" value={form.country} readOnly />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="place-order-btn" disabled={!stripe || redirecting}>
              {redirecting ? "Processing..." : "Pay Now"}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image_url} alt={item.name} />
                <div>
                  <p>{item.name} x {item.quantity}</p>
                  <p>AU${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <p><strong>Items:</strong> {totalItems}</p>
            <p><strong>Subtotal:</strong> AU${total}</p>
            <p><strong>Shipping:</strong> AU$5.99</p>
            <h3>Total: AU${(parseFloat(total) + 5.99).toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
