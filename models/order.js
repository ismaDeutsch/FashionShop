const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal_code: {
        type: Number,
        required: true,
      },
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: false,
      },
    },
    status: { type: String, default: "Livré" },
    observe: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
