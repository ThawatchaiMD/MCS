const connectDB = require("../config/db");

exports.realtimeData = async (req, res) => {
    try {
      const pool = await connectDB();
      const deviceID = req.params.id;

      const sql = `SELECT 
                    name, 
                    data AS value,
                    unit
                  FROM point_info
                  WHERE device_id = $1`;
      const realtimeData = await pool.query(sql,[deviceID]);

      res.send(realtimeData.rows);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };
  