const connectDB = require("../config/db");

exports.procedure = async (req, res) => {
  try {
    const pool = await connectDB();
    const deviceID = req.params.id;

    const haemoUpdate = await pool.query(`
                SELECT 
                    *
                FROM haemo_update`
    );
    console.log(haemoUpdate.rows)

    res.send("realtimeData.rows");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
