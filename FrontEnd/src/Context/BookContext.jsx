import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Load books from API
 const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/books");
      console.log(res)
    //   const data = await res.json();
      setBooks(res.data);
    } catch (e) {
      console.error("Failed to load books", e);
    } finally {
      setLoading(false);
    }
  };

const loadCart = async () => {
  try {
    const res = await axios.get("/api/cart");
    setCart(res.data.items);
  } catch (e) {
    console.log("Error loading cart", e);
  }
};

  useEffect(() => {
    loadBooks();
    loadCart();
  }, []);

  const addBook = async (book) => {
    const res = await axios.post("/api/books", book); 
    setBooks((prev) => [...prev, res.data]);
    return res.data;
    };
    

  const updateBook = async (id, updatedFields) => {
    const res = await axios.put(`/api/books/${id}`, updatedFields);
    setBooks((prev) =>
      prev.map((b) => (b._id === id || b.id === id ? res.data : b))
    );
    return res.data;
};
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedFields),
    // });
    

  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`); 
    setBooks((prev) => prev.filter((b) => b._id !== id && b.id !== id));
  };



 const addToCart = async (book) => {
  try {
    const res = await axios.post("/api/cart/add", { book });
    setCart(res.data.items); // update frontend with MongoDB
  } catch (e) {
    console.log("Error adding to cart", e);
  }
};

const likeBook = async (id) => {
  const res = await axios.post(`/api/books/${id}/like`);
  setBooks((prev) =>
    prev.map((b) => (b._id === id ? res.data : b))
  );
};

const addComment = async (id, text) => {
  const res = await axios.post(`/api/books/${id}/comment`, { text });
  setBooks((prev) =>
    prev.map((b) => (b._id === id ? res.data : b))
  );
};

  
  return (
    <BookContext.Provider
      value={{
        books,
        cart,
        loading,
        loadBooks,
        loadCart,
        addBook,
        updateBook,
        deleteBook,
        addToCart,
        likeBook,
        addComment,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
