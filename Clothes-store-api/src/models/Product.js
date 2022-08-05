const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Product",
    },
    comment: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    listImg: { type: [String], required: true },
    categories: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Category",
    },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    reviews: [CommentSchema],
    quantityInStock: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text" });
const Product = mongoose.model("Product", ProductSchema);
const Comment = mongoose.model("Comment", CommentSchema);

Product.createIndexes({ title: "text" });

module.exports = { Product, Comment };
