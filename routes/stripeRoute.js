const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController")

router.post("/checkout/payment", stripeController.payment);

module.exports = router;
