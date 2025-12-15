const express = require("express");
const router = express.Router();
const Book = require ("../Models/booksModel");
const {
  createBook,
  getBooks,
  removeBooks,
  updateBookAction,
  getDeletedBooks,
} = require("../Controllers/bookController");

router.get("/", async (req, res) => {
  console.log("this is get book route");
   res.json(await getBooks());
});
// create Books
router.post("/", async (req, res) => {
  const body = req.body;
  const newBook = await createBook(body);
  res.json(newBook);
});

//Like a book:
router.post("/:id/like", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    book.likes += 1;
    await book.save();

    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error liking book" });
  }
});

//  Add comments:
router.post("/:id/comment", async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Comment is required" });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    book.comments.push({ text });  
    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding comment" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const isDeleted = await removeBooks(id);
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(403);
  }
});

//update book

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedBook = await updateBookAction(id, body);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.sendStatus(403);
  }
});

router.get("/deleted", async (req, res) => {
  const deleted = await getDeletedBooks();
  res.json(deleted);
});

module.exports = router;