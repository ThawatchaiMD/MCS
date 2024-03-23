const connectDBEnergy = require("../config/dbEnergy");
const connectDBDevice = require("../config/dbDevice");

exports.myDevice = async (req, res) => {
  try {
    const pool = await connectDBEnergy();
    const pool1 = await connectDBDevice();
    const { id, role } = req.user;
    if (role == "superadmin") {
      const sqlSuperAdmin = `SELECT
                                device_info.id AS device_id,
                                device_info.name AS device_name,
                                gateway_info.name AS gateway_name,
                                building_info.name AS building_name,
                                point_info.data 
                            FROM
                                building_info
                            INNER JOIN
                                gateway_info ON gateway_info.building_id = building_info.id
                            INNER JOIN
                                gateway_device ON gateway_device.gateway_id = gateway_info.id
                            INNER JOIN
                                device_info ON device_info.id = gateway_device.device_id
                            LEFT JOIN 
                                point_info ON point_info.device_id = device_info.id AND point_info.unit = 'kWh'`;

      const allDevice = await pool.query(sqlSuperAdmin);
      return res.send(allDevice.rows);
    } else {
      const sql = `SELECT
                    device_info.id AS device_id,
                    device_info.name AS device_name,
                    gateway_info.name AS gateway_name,
                    building_info.name AS building_name,
                    point_info.data 
                  FROM
                    building_user
                  INNER JOIN
                    building_info ON building_user.building_id = building_info.id
                  INNER JOIN
                    gateway_info ON gateway_info.building_id = building_info.id
                  INNER JOIN
                    gateway_device ON gateway_device.gateway_id = gateway_info.id
                  INNER JOIN
                    device_info ON device_info.id = gateway_device.device_id
                    LEFT JOIN 
                    point_info ON point_info.device_id = device_info.id AND point_info.unit = 'kWh'
                  WHERE
                    building_user.user_id = $1`;
      const myDevice = await pool.query(sql, [id]);
      return res.send(myDevice.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
