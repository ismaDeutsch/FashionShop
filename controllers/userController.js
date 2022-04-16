const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.update = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ user: updateUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

module.exports.collectAll = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({}, { pwd: 0 }).sort({ _id: -1 }).limit(5)
      : await User.find({}, { pwd: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.collectOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.ChangePassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const pwd = await bcrypt.hash(req.body.pwd, salt);
    const user = await User.findOneAndUpdate(
      req.params.id,
      { $set: { pwd: pwd } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
