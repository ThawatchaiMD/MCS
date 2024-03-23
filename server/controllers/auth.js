const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../config/db");

exports.register = async (req, res) => {
  try {
    // Check user
    const pool = await connectDB();
    const uuidUserID = uuidv4();
    const {
      username,
      first_name,
      last_name
    } = req.body;


    var findUser = await pool.query(
      "SELECT username from user_info WHERE username = $1",
      [username]
    );

    if (findUser.rows.length !== 0) {
      return res.json({ status: "error" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const userInsert = await pool.query(
        "INSERT INTO public.user_info ( id, username, password, first_name, last_name, role, enabled, last_login ) VALUES ($1, $2, $3, $4, $5, 'admin', 'true', CURRENT_TIMESTAMP)",
        [
          uuidUserID,
          username,
          password,
          first_name,
          last_name
        ]
      );
      res.json({ status: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
};

exports.login = async  (req, res, next) => {
  try {
    const pool = await connectDB();
    const { username, password } = req.body;
    //var user = await User.findOneAndUpdate({ username }, { new: true });

    const finduser = await pool.query(
      "SELECT id, username, password, role, enabled from user_info WHERE username = $1",
      [username]
    );

    if (finduser.rows.length !== 0 && finduser.rows[0].enabled) {
      // Chack Password
      const isMatch = await bcrypt.compare(password, finduser.rows[0].password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }

      const updateTimestamp = await pool.query(
        "UPDATE user_info SET last_login = CURRENT_TIMESTAMP WHERE username = $1",
        [username]
      );

      // Payload
      const payload = {
        user: {
          id: finduser.rows[0].id,
          username: finduser.rows[0].username,
          role: finduser.rows[0].role,
        }
      };

      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ status: "ok", message: "Login success", token });
      });
    } else {
      res.json({ status: "error", message: "No user found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.auth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, "jwtSecret");
    res.json({ status: "ok", decoded });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
};