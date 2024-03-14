const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);

router.post("/login", userController.loginUser);
router.post("/forgot/password",userController.forgotPassword);
router.put("/password/reset/:token",userController.resetPassword);
module.exports = router;
