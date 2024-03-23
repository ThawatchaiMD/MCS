const express = require("express");
const router = express.Router();

// controllers
const {
  listUser,
  removeUser
} = require("../controllers/user");

router.get("/user/list", listUser);

router.get("/user/remove", removeUser);

module.exports = router;