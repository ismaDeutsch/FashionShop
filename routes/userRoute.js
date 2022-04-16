const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const addressController = require("../controllers/addressController");
const {
  verifyIsAdmin,
  verifyAuthorisation,
} = require("../middleware/verifyAuth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.put("/:id", verifyAuthorisation, userController.update);
router.delete("/:id", userController.delete);
router.get("/", verifyIsAdmin, userController.collectAll);
router.get("find/:id", userController.collectOne);
router.post("/password-reset", authController.forgot);
router.post("/password-reset/:userId/:token", authController.resetPwd);

router.post("/address-new", addressController.add);
router.put("/address/:idEdit/:id", verifyAuthorisation, addressController.update);
router.delete("/address/:idDel/:id", verifyAuthorisation, addressController.delete);
router.get("/address/find/:userId", addressController.collecte);

router.get("/stats", verifyIsAdmin, userController.stats);
router.put("/password/:id", userController.ChangePassword);

module.exports = router;
