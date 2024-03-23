const connectDBEnergy = require("../config/dbEnergy");
const connectDBDevice = require("../config/dbDevice");

exports.setupMQTTListener = async (topic, message, packet) => {
  try {
    let obj = JSON.parse(message);
    const parts = topic.split("/");
    const deviceID = parts[1];
    const pool = await connectDBEnergy();
    const sql = `SELECT
                  name
                FROM device_info
                WHERE id = $1`;

      const findDevice = await pool.query(sql, [deviceID]);

      if (findDevice.rows.length !== 0) {
        //const pool1 = await connectDBDevice();
        const timestamp = obj.timestamp;
        //const id = deviceID + "_realtime";

        for (const obj1 of obj.data) {
          const point = obj1.point;
          const data = obj1.data;
          const addData = await pool.query(
            'UPDATE point_info SET timestamp = $1, data = $2 WHERE name = $3',
            [timestamp, data, point]
          );
        }
      }
  } catch (error) {
    console.log(error);
  }
};
