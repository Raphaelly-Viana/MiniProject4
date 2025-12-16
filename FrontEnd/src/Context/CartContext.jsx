import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

  // Load cart when start
  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add item in cart
  const addToCart = async (book) => {
    try {
      const res = await axios.post("/api/cart/add", {
        book,
      });

      setCart(res.data);
    } catch (error) {
      console.error("Error in adding in Cart:", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.post("/api/cart/remove", {
        bookId,
      });

      setCart(res.data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}