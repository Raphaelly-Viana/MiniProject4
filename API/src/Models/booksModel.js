const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, trim: true, required: true },
  author: { type: String, required: true },
   category: { type: String, required: true},
  year: { type: Number, required: false }, // year is optional
 price: { type: Number, required: true },
 image: { type: String, required: true },
  deleted: { type: Boolean, default: false }, 
 likes: {    type: Number,     default: 0   },

  comments: [
    {
      text: { type: String, required: true },
      createdAt: {   type: Date,  default: Date.now       }
    }
  ]
});

module.exports = mongoose.model("Book", BookSchema);
