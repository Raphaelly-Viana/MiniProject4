const express = require("express");
const router = express.Router();
const Cart = require("../Models/cartModel");

// Checkout
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

   
    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // clean checkout
    cart.items = [];
    await cart.save();

    res.json({
      message: "Checkout successful",
      total
    });
  } catch (error) {
    res.status(500).json({ error: "Checkout failed" });
  }
});

module.exports = router;
