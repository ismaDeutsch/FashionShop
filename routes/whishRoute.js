const express = require("express");
const router = express.Router();
const whishController = require("../controllers/whishController");
const { verifyAuthorisation } = require("../middleware/verifyAuth");

router.post("/:id", verifyAuthorisation, whishController.add);
router.get("/collect/:id", verifyAuthorisation, whishController.collect);
router.put("/update/:id", verifyAuthorisation, whishController.update);

module.exports = router;