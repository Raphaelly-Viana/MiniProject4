const express = require("express");
const Cart = require("../Models/cartModel");
const router = express.Router();


// Add to cart
router.post("/add", async (req, res) => {
  const { book } = req.body;

  let cart = await Cart.findOne();
  if (!cart) {
    cart = new Cart({ items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.bookId.toString() === book._id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
  cart.items.push({
    bookId: book._id,
    title: book.title,
    price: book.price,
    quantity: 1
  });
}

  await cart.save();

  res.json(cart);
});

router.get("/", async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [] });
});

module.exports = router;