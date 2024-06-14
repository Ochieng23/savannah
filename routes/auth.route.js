const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

// Route to register a new user

router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to logout a user

router.post("/logout", logoutUser);

module.exports = router;
