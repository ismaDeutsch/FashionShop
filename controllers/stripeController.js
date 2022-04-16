const dotenv = require("dotenv");
dotenv.config();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

module.exports.payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "EUR",
      shipping: {
        address: {
          line1: req.body.address.line1,
          city: req.body.address.city,
          postal_code: req.body.address.postal_code,
          country: req.body.address.country,
        },
        name:
          req.body.address.name.firstName +
          " " +
          req.body.address.name.lastName,
      },
    },
    (stripeError, stripeRes) => {
      if (stripeError) res.status(500).json(stripeError);
      else res.status(200).json(stripeRes);
    }
  );
};
