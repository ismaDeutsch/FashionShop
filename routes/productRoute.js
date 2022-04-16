const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const { verifyIsAdmin } = require("../middleware/verifyAuth");

router.post("/", verifyIsAdmin, productController.create);
router.put("/:id", verifyIsAdmin, productController.update);
router.delete("/:id", verifyIsAdmin, productController.delete);
router.get("/", productController.collectAll);
router.get("/find/:id", productController.collectOne);
router.put("/stock/quantity", productController.decQuantity);
router.put("/order/review", productController.review);

module.exports = router;
