const Product = require("../models/product");
const mongoose = require("mongoose");

module.exports.create = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body.product });
    res.status(201).json({ product });
  } catch (error) {
    console.log(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: req.body.product },
      { new: true }
    );
    res.status(200).json({ updateProduct });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.decQuantity = async (req, res) => {
  try {
    const decQProduct = await Product.updateOne(
      {
        _id: req.body.productId,
      },
      { $inc: { countInStock: -req.body.amount } }
    );
    res.status(200).json(decQProduct);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

module.exports.collectAll = async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory === "news") {
      products = await Product.find().sort({ createdAt: 1}).limit(10);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.collectOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.review = async (req, res) => {
  const review = {
    user: req.body.userId,
    rating: req.body.rating,
    comment: req.body.comment,
  };
  try {
    const addReview = await Product.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.productId) },
      {
        $push: { reviews: review },
        $inc: { "ratings.numReviews": 1 },
      },
      { new: true }
    );
    const avgRating = await Product.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.productId) } },
      { $unwind: "$reviews" },
      { $group: { _id: null, avg: { $avg: { $sum: "$reviews.rating" } } } },
    ]);
    const updateAvg = await Product.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.productId) },
      {
        $set: { "ratings.avgRating": avgRating[0].avg },
      }
    );
    res.status(200).json("update ok");
  } catch (error) {
    res.status(400).json({ error });
  }
};
