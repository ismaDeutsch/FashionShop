const Whish = require("../models/whish");

module.exports.add = async (req, res) => {
  try {
    const isExist = await Whish.find({ userId: req.user.id._id });
    if (isExist.length > 0) {
      this.update(req, res);
    } else {
      const whish = await Whish.create({
        userId: req.params.id,
        products: req.body.productId,
      });
      res.status(201).json(whish);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    let whish;
    if (req.body.type === "remove") {
      whish = await Whish.findOneAndUpdate(
        { userId: req.user.id._id },
        { $pull: { products: req.body.productId } },
        { new: true }
      );
    } else {
      whish = await Whish.findOneAndUpdate(
        { userId: req.user.id._id },
        { $addToSet: { products: req.body.productId } },
        { new: true }
      );
    }
    res.status(200).json(whish);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.collect = async (req, res) => {
  try {
    const whish = await Whish.find({ userId: req.params.id });
    res.status(200).json(whish);
  } catch (error) {
    res.status(400).json(error);
  }
};
