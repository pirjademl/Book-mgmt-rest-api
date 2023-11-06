const asyncHandler = require("express-async-handler");
const Book = require("../models/bookmodel");
//@desc Get all Books
// @route GET /api/books
// @access private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user_id: req.user.id });
  res.status(200).json(books);
});
//@desc Create new book
// @route POST /api/contacts
// @access private
const createBook = asyncHandler(async (req, res) => {
  const { title, author, price, rating } = req.body;

  if (!title || !author || !price || !rating) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const book = await Book.create({
    title,
    author,
    price,
    rating,
    user_id: req.user.id,
  });

  res.status(201).json(book);
});

//@desc get  book
// @route GET /api/contacts
// @access private
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.status(200).json(book);
});
//@desc Update  book
// @route PUT /api/contacts/:id
// @access private
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (book.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedBook);
});

//@desc delete  book
// @route DELETE /api/contacts/:id
// @access private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(!book);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (book.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

module.exports = {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
