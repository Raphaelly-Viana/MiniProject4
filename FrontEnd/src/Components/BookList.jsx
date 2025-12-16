import { useContext, useState } from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";

function BookList() {
  const { books, loading } = useContext(BookContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // get random categories.
  const categories = ["", ...new Set(books.map((b) => b.category))];

  // Filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || book.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h2>Books</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
       
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat === "" ? "All Categories" : cat}
          </option>
        ))}
      </select>
      </div>

      {/* Grid */}
      <div>
        {filteredBooks.length === 0 && <p>No books found.</p>}

        {filteredBooks.map((book) => (
          <BookItem key={book._id || book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookList;