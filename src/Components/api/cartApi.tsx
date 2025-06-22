import axiosClient from "./axiosClient";
import { CartResponse } from "../interfaces/CartResponse";

// Add item to cart
export const addToCart = async (productId: number) => {
    return await axiosClient.post(`/shoppingCart/add/${productId}`);
};

// Remove item from cart
export const removeFromCart = async (productId: number) => {
    return await axiosClient.post(`/shoppingCart/remove/${productId}`);
};

// Get all items
export const fetchCart = async (): Promise<CartResponse> => {
    const res = await axiosClient.get<CartResponse>("/shoppingCart");
    return res.data;
};

// Get cart item count
export const getCartCount = async (): Promise<number> => {
    const res = await axiosClient.get<{ number: number }>("/shoppingCart/items");
    return res.data.number;
};

