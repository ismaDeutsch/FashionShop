const Cart = require("../models/cart");

module.exports.create = async (req, res) => {
  try {
    const cart = await Cart.create({ ...req.body });
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updateCart = await Cart.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.id });
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

module.exports.collectAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.collectOne = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};