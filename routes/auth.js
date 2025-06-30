const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middleware/validate");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);


module.exports = router;
