const express = require("express");
const router = express.Router();

// controllers
const {
  register,
  login,
  auth,
} = require("../controllers/auth");

router.post("/auth/register", register);


router.post("/auth/login", login);

router.post("/auth", auth);

module.exports = router;