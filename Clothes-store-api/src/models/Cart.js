const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        productName: {
          type: String,
          required: true,
        },
        image:{
          type:String
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart };
