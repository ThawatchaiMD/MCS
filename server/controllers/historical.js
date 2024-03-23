const connectDBEnergy = require("../config/dbEnergy");
let dayjs = require("dayjs");

exports.historicalData = async (req, res) => {
  try {
    let startTime;
    let endTime;
    const pool1 = await connectDBDevice();
    const pool = await connectDBEnergy();
    let dateTimeFormat = req.query.dateTimeFormat;
    let orderBy = req.query.orderBy;
    //let deviceData = req.query.deviceData
    let deviceData = req.body;
    let historical = [];
    //console.log(deviceData)

    switch (dateTimeFormat) {
      case "past24":
        startTime = dayjs().format("YYYY-MM-DD HH:mm");
        endTime = dayjs().subtract(24, "hour").format("YYYY-MM-DD HH:00");
        for (const item of deviceData) {
          const { deviceID, deviceName, data } = item;
          const deviceIDTBDaily = `"${deviceID}_daily"`;
          const timestamp = [];
          const dataqury = [];

          const findDeviceID = await pool.query(
            `SELECT name
            FROM device_info
            WHERE id = $1`,
            [deviceID]
          );
          console.log(findDeviceID.rows)
          if (findDeviceID.rows.length == 0){
            return res.status(404).send(`Device ${deviceName} Not Found`);
          }

          const historicalPast24 = await pool1.query(
            `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
            FROM ${deviceIDTBDaily}
            WHERE point_name = $1 
            AND timestamp BETWEEN $2 AND $3
            ORDER BY timestamp ASC;`,
            [data, endTime, startTime]
          );

          for (const item of historicalPast24.rows) {
            timestamp.push(item.timestamp);
            dataqury.push(item.data);
          }

          historical.push([
            {
              device: deviceName,
              point: data,
              timestamp: timestamp,
              data: dataqury,
            },
          ]);
        }
        return res.send(historical);
      case "past7":
        startTime = dayjs().format("YYYY-MM-DD HH:mm");
        endTime = dayjs().subtract(7, "day").format("YYYY-MM-DD HH:00");
        for (const item of deviceData) {
          console.log(deviceData)
          const { deviceID, deviceName, data } = item;
          const deviceIDTBWeekly = `"${deviceID}_weekly"`;
          const timestamp = [];
          const dataqury = [];

          const findDeviceID = await pool.query(
            `SELECT name
            FROM device_info
            WHERE id = $1`,
            [deviceID]
          );
          console.log(findDeviceID.rows)
          if (findDeviceID.rows.length == 0){
            return res.status(404).send(`Device ${deviceName} Not Found`);
          }

          const historicalPast7 = await pool1.query(
            `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
            FROM ${deviceIDTBWeekly}
            WHERE point_name = $1 
            AND timestamp BETWEEN $2 AND $3
            ORDER BY timestamp ASC;`,
            [data, endTime, startTime]
          );

          for (const item of historicalPast7.rows) {
            timestamp.push(item.timestamp);
            dataqury.push(item.data);
          }

          historical.push([
            {
              device: deviceName,
              point: data,
              timestamp: timestamp,
              data: dataqury,
            },
          ]);
        }
        return res.send(historical);
      case "past30":
        startTime = dayjs().format("YYYY-MM-DD HH:mm");
        endTime = dayjs().subtract(30, "day").format("YYYY-MM-DD HH:00");
        for (const item of deviceData) {
          const { deviceID, deviceName, data } = item;
          const deviceIDTBMonthly = `"${deviceID}_monthly"`;
          const timestamp = [];
          const dataqury = [];

          const findDeviceID = await pool.query(
            `SELECT name
            FROM device_info
            WHERE id = $1`,
            [deviceID]
          );
          console.log(findDeviceID.rows)
          if (findDeviceID.rows.length == 0){
            return res.status(404).send(`Device ${deviceName} Not Found`);
          }

          const historicalPast30 = await pool1.query(
            `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
            FROM ${deviceIDTBMonthly}
            WHERE point_name = $1 
            AND timestamp BETWEEN $2 AND $3
            ORDER BY timestamp ASC;`,
            [data, endTime, startTime]
          );

          for (const item of historicalPast30.rows) {
            timestamp.push(item.timestamp);
            dataqury.push(item.data);
          }

          historical.push([
            {
              device: deviceName,
              point: data,
              timestamp: timestamp,
              data: dataqury,
            },
          ]);
        }
        return res.send(historical);
      default:
        startTime = dayjs(req.query.startTime).format("YYYY-MM-DD HH:mm");
        endTime = dayjs(req.query.endTime).format("YYYY-MM-DD HH:mm");
        let currentTime = new dayjs();
        const differenceInDaysStartTime = (currentTime.diff(startTime)) / (1000 * 3600 * 24);
        const differenceInDaysEndTime = (currentTime.diff(endTime)) / (1000 * 3600 * 24);

        if (differenceInDaysEndTime <= 1 && differenceInDaysStartTime <= 1){
          console.log("daily")
          for (const item of deviceData) {
            const { deviceID, deviceName, data } = item;
            const deviceIDTBDaily = `"${deviceID}_daily"`;
            const timestamp = [];
            const dataqury = [];

            const findDeviceID = await pool.query(
              `SELECT name
              FROM device_info
              WHERE id = $1`,
              [deviceID]
            );
            console.log(findDeviceID.rows)
            if (findDeviceID.rows.length == 0){
              return res.status(404).send(`Device ${deviceName} Not Found`);
            }
  
            const historicalPast24 = await pool1.query(
              `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
              FROM ${deviceIDTBDaily}
              WHERE point_name = $1 
              AND timestamp BETWEEN $2 AND $3
              ORDER BY timestamp ASC;`,
              [data,startTime, endTime]
            );
  
            for (const item of historicalPast24.rows) {
              timestamp.push(item.timestamp);
              dataqury.push(item.data);
            }
  
            historical.push([
              {
                device: deviceName,
                point: data,
                timestamp: timestamp,
                data: dataqury,
              },
            ]);
          }
          return res.send(historical);

        } else if (differenceInDaysEndTime <= 7 && differenceInDaysStartTime > 1 && differenceInDaysStartTime <= 7){
          console.log("weekly")
          for (const item of deviceData) {
            const { deviceID, deviceName, data } = item;
            const deviceIDTBWeekly = `"${deviceID}_weekly"`;
            const timestamp = [];
            const dataqury = [];

            const findDeviceID = await pool.query(
              `SELECT name
              FROM device_info
              WHERE id = $1`,
              [deviceID]
            );
            console.log(findDeviceID.rows)
            if (findDeviceID.rows.length == 0){
              return res.status(404).send(`Device ${deviceName} Not Found`);
            }
  
            const historicalPast7 = await pool1.query(
              `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
              FROM ${deviceIDTBWeekly}
              WHERE point_name = $1 
              AND timestamp BETWEEN $2 AND $3
              ORDER BY timestamp ASC;`,
              [data, startTime, endTime]
            );
  
            for (const item of historicalPast7.rows) {
              timestamp.push(item.timestamp);
              dataqury.push(item.data);
            }
  
            historical.push([
              {
                device: deviceName,
                point: data,
                timestamp: timestamp,
                data: dataqury,
              },
            ]);
          }
          return res.send(historical);

        } else if (differenceInDaysEndTime <= 30 && differenceInDaysStartTime > 7 && differenceInDaysStartTime <= 30 ){
          console.log("monthly")
          for (const item of deviceData) {
            const { deviceID, deviceName, data } = item;
            const deviceIDTBMonthly = `"${deviceID}_monthly"`;
            const timestamp = [];
            const dataqury = [];

            const findDeviceID = await pool.query(
              `SELECT name
              FROM device_info
              WHERE id = $1`,
              [deviceID]
            );
            console.log(findDeviceID.rows)
            if (findDeviceID.rows.length == 0){
              return res.status(404).send(`Device ${deviceName} Not Found`);
            }
  
            const historicalPast30 = await pool1.query(
              `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
              FROM ${deviceIDTBMonthly}
              WHERE point_name = $1 
              AND timestamp BETWEEN $2 AND $3
              ORDER BY timestamp ASC;`,
              [data, startTime, endTime]
            );
  
            for (const item of historicalPast30.rows) {
              timestamp.push(item.timestamp);
              dataqury.push(item.data);
            }
  
            historical.push([
              {
                device: deviceName,
                point: data,
                timestamp: timestamp,
                data: dataqury,
              },
            ]);
          }
          return res.send(historical);

        } else {
          console.log("yearly")
          for (const item of deviceData) {
            const { deviceID, deviceName, data } = item;
            const deviceIDTBYearly = `"${deviceID}_yearly"`;
            const timestamp = [];
            const dataqury = [];
            
            const findDeviceID = await pool.query(
              `SELECT name
              FROM device_info
              WHERE id = $1`,
              [deviceID]
            );
            console.log(findDeviceID.rows)
            if (findDeviceID.rows.length == 0){
              return res.status(404).send(`Device ${deviceName} Not Found`);
            }
  
            const historicalPast30 = await pool1.query(
              `SELECT to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') AS timestamp, point_name, data
              FROM ${deviceIDTBYearly}
              WHERE point_name = $1 
              AND timestamp BETWEEN $2 AND $3
              ORDER BY timestamp ASC;`,
              [data, startTime, endTime]
            );
  
            for (const item of historicalPast30.rows) {
              timestamp.push(item.timestamp);
              dataqury.push(item.data);
            }
  
            historical.push([
              {
                device: deviceName,
                point: data,
                timestamp: timestamp,
                data: dataqury,
              },
            ]);
          }
          return res.send(historical);
          
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
