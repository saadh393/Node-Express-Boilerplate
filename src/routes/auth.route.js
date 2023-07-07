const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validator/auth.validator");
const validate = require("../middleware/validator.middleware");
const CatchAsync = require("../lib/CatchAsync");

// Initial Router App
const router = express.Router();

router.post("/register", validate(authValidator.register), CatchAsync(authController.register));
router.post("/login", validate(authValidator.login), CatchAsync(authController.login));

module.exports = router;
