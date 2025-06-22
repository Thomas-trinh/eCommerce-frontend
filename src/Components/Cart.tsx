import React, { useEffect, useState } from "react";
import axiosClient from "./api/axiosClient";
import Navbar from "./Navbar";
import "./styles/Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CartItem } from "./interfaces/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0.00");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();


  const fetchCart = async () => {
    try {
      const res = await axiosClient.get<{ products: CartItem[]; totalPrice: string }>("/shoppingCart");
      setCartItems(res.data.products);
      setTotalPrice(res.data.totalPrice);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (index: number) => {
    try {
      await axiosClient.post(`/shoppingCart/remove/${index}`);
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const updateQuantity = async (productId: number, change: number) => {
    try {
      await axiosClient.post(`/shoppingCart/update/${productId}`, { change });
      fetchCart(); // Refresh updated cart
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };  

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Shopping Bag</h1>

        {!isLoggedIn ? (
          <div className="cart-warning">
            <p>
              Please <Link to="/login" className="cart-login-link">log in</Link> to view or manage your cart.
            </p>
          </div>
        ) : loading ? (
          <p>Loading your cart...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>AU${Number(item.price).toFixed(2)}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        ➖
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>➕</button>
                    </div>
                    <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: AU${Number(totalPrice).toFixed(2)}</h2>
              <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
