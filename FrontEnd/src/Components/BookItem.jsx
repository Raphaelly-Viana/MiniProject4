import { useContext, useState } from "react";
import { BookContext } from "../Context/BookContext";
import { CartContext } from "../Context/CartContext";

export default function BookItem({ book }) {
  const { updateBook, deleteBook, addComment, likeBook  } = useContext(BookContext);
  const { addToCart } = useContext(CartContext);
    const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    price: book.price,
    category: book.category,
    image: book.image,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="book-item">
      {editMode ? (
        <>
          <input name="title" value={form.title} onChange={handleChange} />
          <input name="author" value={form.author} onChange={handleChange} />
          <input
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
          <input name="image" value={form.image} onChange={handleChange} />

         

          <button
            onClick={() => {
              updateBook(book._id, form);
              setEditMode(false);
            }}
          >
            Save
          </button>

          <button onClick={() => setEditMode(false)}>Cancel</button>

        </>
      ) : (
        // Same as if / else
        <>
          <img
            src={book.image}
            alt={book.title}
            style={{ width: "120px", borderRadius: "8px" }}
          />
          <p>
            <strong>{book.title}</strong> — {book.author}
          </p>
          <p>${book.price}</p>
          <p>Category: {book.category}</p>

          <button onClick={() => likeBook(book._id)}>❤️ {book.likes}</button>

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
  onClick={() => {
    if (!comment.trim()) return; 
    addComment(book._id, comment);
    setComment("");
  }}
>
  Add Comment
</button>
          </div>

     {book.comments?.map((c, index) => (
  <li key={index}>
    {c.text}
    <small style={{ marginLeft: "8px", color: "#777" }}>
      ({new Date(c.createdAt).toLocaleDateString()})
    </small>
  </li>
))}

          <button
            onClick={() => {
              addToCart(book);
            }}
          >
            Add to Cart
          </button>

          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </>
      )}
    </div>
  );
}