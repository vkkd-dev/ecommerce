const express = require("express");

const signupController = require("../controllers/signup");

const router = express.Router();

router.post("/signup", signupController.signup);

module.exports = router;
