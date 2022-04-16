const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      default: 1,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    ratings: {
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      avgRating: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewsSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Reviews", reviewsSchema);
module.exports = mongoose.model("Product", productSchema);
