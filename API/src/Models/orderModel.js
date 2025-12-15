import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      bookId: mongoose.Schema.Types.ObjectId,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", OrderSchema);