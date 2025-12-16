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
    (item) => item.book._id.toString() === book._id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      book,
      quantity: 1,
    });
  }

  await cart.save();
  res.json(cart);
});

// Remove from cart
router.post("/remove", async (req, res) => {
  const { bookId } = req.body;

  let cart = await Cart.findOne();
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter(
    (item) => item.book._id.toString() !== bookId
  );

  await cart.save();
  res.json(cart);
});

// Get cart
router.get("/", async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [] });
});

module.exports = router;