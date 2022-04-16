const Order = require("../models/order");

module.exports.create = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updateOrder = await Order.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

module.exports.collectAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.collectOne = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.income = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]).sort({_id: 1});
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.sales = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: { $size: "$products" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]).sort({_id: 1});
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
};
