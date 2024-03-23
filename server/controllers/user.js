const connectDB = require("../config/db");
// const connectDBDevice = require("../config/dbDevice");
let dayjs = require("dayjs");

exports.listUser = async (req, res) => {
  try {
    const pool = await connectDB();
    const listUser = await pool.query(
        `SELECT 
          id,
          username,
          first_name,
          last_name,
          last_login
        FROM user_info
        ORDER BY first_name;`
      );
    res.send(listUser.rows)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.removeUser = async (req, res) => {
    try {
      const pool = await connectDB();
      const id = req.query.id
      console.log(id)
      const listUser = await pool.query(
          `DELETE FROM user_info
          WHERE id = $1`, [id]
        );
      res.send("remove success")
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };
