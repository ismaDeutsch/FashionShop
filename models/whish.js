const mongoose = require("mongoose");

const whishSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whish", whishSchema);
