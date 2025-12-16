const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  items: [
    {
      book: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);