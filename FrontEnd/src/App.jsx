import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./Context/BookContext";

import HomePage from "./Pages/HomePage";
import BookListPage from "./Pages/BookListPage";
import CartPage from "./Pages/CartPage"; 
import Nav from "./Components/Nav";
import { CartProvider } from "./Context/CartContext";
import CheckoutPage from "./Pages/CheckoutPage";



 function App() {
  return (
    <CartProvider>
    <BookProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </BookProvider>
    </CartProvider>
  );
}

export default App;