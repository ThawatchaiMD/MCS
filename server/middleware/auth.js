const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).send("No token, authorization denied");
    }
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invalid");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const pool = await connectDB();
    const { username } = req.user;
    const adminUser = await pool.query(
      "SELECT username, role from user_info WHERE username = ($1)",
      [username]
    );
    console.log(adminUser.rows[0].role);
    if (adminUser.rows[0].role !== "admin") {
      res.status(403).send(err, "Admin Access denied");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Admin Access denied");
  }
};
