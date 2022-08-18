const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product",
        },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String },
        size: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    fullname: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: Number, default: 0 },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    bill:{type:Number, default:0}
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };
