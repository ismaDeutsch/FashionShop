const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [
      {
        name: {
          type: Object,
          required: true,
        },
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
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
