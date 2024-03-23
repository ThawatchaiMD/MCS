const express = require("express");
const router = express.Router();


// middleware
const { auth, adminCheck } = require("../middleware/auth");

// controllers
const { procedure }  = require("../controllers/procedure");

router.get("/procedure", procedure);

module.exports = router;