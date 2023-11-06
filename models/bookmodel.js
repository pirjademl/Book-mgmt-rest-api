const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add the title of the book"],
    },
    author: {
      type: String,
      required: [true, "Please add the author of the book"],
    },
    price: {
      type: Number,
      required: [true, "Please add the price of the book"],
    },
    rating: {
      type: Number,
      required: [true, "Please add the rating of the book"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", bookSchema); // Book is the name of the collection in the database
