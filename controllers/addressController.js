const Address = require("../models/address");

module.exports.add = async (req, res) => {
  try {
    const isExist = await Address.findOne({ userId: req.body.id });
    if (isExist) {
      const newAddress = await Address.findOneAndUpdate(
        { userId: req.body.id },
        { $push: { address: req.body.address } },
        { new: true }
      );
      res.status(200).json(newAddress.address);
    } else {
      const newAddress = await Address.create({
        userId: req.body.id,
        address: req.body.address,
      });
      res.status(200).json(newAddress.address);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updateAddress = await Address.findOneAndUpdate(
      { "address._id": req.params.idEdit },
      {
        $set: {
          "address.$.country": req.body.address?.country,
          "address.$.city": req.body.address?.city,
          "address.$.postal_code": req.body.address?.postal_code,
          "address.$.line1": req.body.address?.line1,
          "address.$.line2": req.body.address?.line2,
          "address.$.name.firstName": req.body.address?.name.firstName,
          "address.$.name.lastName": req.body.address?.name.lastName,
        },
      },
      { new: true }
    );
    res.status(201).json(updateAddress);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Address.findOneAndUpdate(
      { userId: req.params.id },
      { $pull: { address: { _id: req.params.idDel } } }
    );
    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.collecte = async (req, res) => {
  try {
    const address = await Address.find({ userId: req.params.userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json(error);
  }
};
