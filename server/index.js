var express = require("express");
var cors = require("cors");
var app = express();
let numeral = require("numeral");

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const secret = "Fullstack-Login-2021";

let dayjs = require("dayjs");

app.use(cors());

const cron = require("node-cron");

// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "mydb",
// });

app.post("/register", jsonParser, function (req, res, next) {
  let conn = require("./connectmysql1");
  console.log(req.body.email);
  if (
    req.body.email != "" &&
    req.body.fname != "" &&
    req.body.lname != "" &&
    req.body.password != ""
  ) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      conn.execute(
        "INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)",
        [req.body.email, hash, req.body.fname, req.body.lname],
        function (err, results, fields) {
          if (err) {
            res.json({ status: "error", message: err });
            return;
          }
          res.json({ status: "ok" });
        }
      );
    });
  } else {
    res.json({ status: "error" });
  }
});

// app.post("/login", jsonParser, function (req, res, next) {
//   let conn = require("./connectmysql1");
//   conn.execute(
//     "SELECT * FROM users WHERE email=?",
//     [req.body.email],
//     function (err, users, fields) {
//       if (err) {
//         res.json({ status: "error", message: err });
//         return;
//       }
//       if (users.length === 0) {
//         res.json({ status: "error", messagea: "no user found" });
//         return;
//       }
//       bcrypt.compare(
//         req.body.password,
//         users[0].password,
//         function (err, isLogin) {
//           if (isLogin) {
//             var token = jwt.sign({ email: users[0].email }, secret, {
//               expiresIn: "1h",
//             });
//             res.json({ status: "ok", message: "login success", token });
//           } else {
//             res.json({ status: "error", message: "login failed" });
//           }
//         }
//       );
//     }
//   );
// });

// app.post("/login", jsonParser, function (req, res, next) {
//   let conn = require("./connectmysql1");
//   conn.execute(
//     "SELECT * FROM users WHERE email=?",
//     [req.body.email],
//     function (err, users, fields) {
//       if (err) {
//         res.json({ status: "error", message: err });
//       } else if (users.length === 0) {
//         res.json({ status: "error", message: "no user found" });
//       } else {
//         bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
//           if (err) {
//             res.json({ status: "error", message: "bcrypt error" });
//           } else if (isLogin) {
//             var token = jwt.sign({ email: users[0].email }, secret, {
//               expiresIn: "1h",
//             });
//             res.json({ status: "ok", message: "login success", token });
//           } else {
//             res.json({ status: "error", message: "login failed" });
//           }
//         });
//       }
//     }
//   );
// });

app.post("/login",jsonParser,  async (req, res) => {
  try{
  let conn = require("./connectmysql2");
  let sql = "SELECT * FROM users WHERE email=?";
  let [users, fields1] = await conn.query(sql, req.body.email);
      if(users.length>0){
        const isMatch =  await bcrypt.compare(req.body.password, users[0].password)
        if(!isMatch){
          return res.json({ status: "error", message: "bcrypt error" });
        }
        jwt.sign({ email: users[0].email },secret,{ expiresIn: 3600 }, (err, token)=>{
          if(err) throw err;
          res.json({ status: "ok", message: "login success", token });
        });
      }else{
        return res.json({ status: "error", message: "no user found" });
    }
  }catch(err){
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.get("/historicalenergy", async (req, res) => {
  let conn = require("./connectmysql2");
  let day = dayjs().format("YYYY-MM-DD HH:mm:ss");
  let daysInmonth = dayjs(day).daysInMonth();
  let daysInMonth = req.query.daysInmonth;
  let t = 24;
  let arrYears = [];
  let arrMonths = [];
  let arrDays = [];
  let arrHour = [];

  // 1day
  for (let i = 1; i <= t; i++) {
    let h = Number(dayjs().subtract(i, "hour").format("HH"));
    let d = Number(dayjs().subtract(i, "hour").format("DD"));
    let m = Number(dayjs().subtract(i, "hour").format("MM"));
    let y = Number(dayjs().subtract(i, "hour").format("YYYY"));
    let date = dayjs().subtract(i, "hour").format("YYYY-MM-DD HH:00");

    //past 24 Hr
    let sqlToday = "";
    sqlToday +=
      " SELECT energyperhour AS energyPerDay, datetime  FROM tb_energyperhour";
    sqlToday += " WHERE HOUR(datetime) = ?";
    sqlToday += " AND DAY(datetime) = ?";
    sqlToday += " AND MONTH(datetime) = ?";
    sqlToday += " AND YEAR(datetime) = ?";
    let paramsToday = [h, d, m, y];
    let [rows1, fields1] = await conn.query(sqlToday, paramsToday);
    if (rows1.length > 0) {
      arrHour.push({
        name: date,
        energy: rows1[0].energyPerDay,
      });
    } else {
      arrHour.push({
        name: date,
        energy: null,
      });
    }
  }

  //month
  for (let i = 1; i <= daysInMonth; i++) {
    let sql = "";
    sql += " SELECT energyperday AS energyPerMonth FROM tb_energyperday";
    sql += " AND DAY(datetime) = ?";
    sql += " AND MONTH(datetime) = ?";
    sql += " AND YEAR(datetime) = ?";

    let params = [i, m, y];
    let [rows, fields] = await conn.query(sql, params);
    if (rows.length > 0) {
      arrMonths.push(rows[0].energyPerDay);
    } else {
      arrMonths.push(null);
    }
  }

  res.send([
    {
      arrHour: arrHour,
      arrDays: arrDays,
      arrMonths: arrMonths,
      arrYears: arrYears,
    },
  ]);
});

app.get("/mydevice", async (req, res) => {
  let conn = require("./connectmysql2");
  let device = [];
  // find uuid, device_name from device_info
  let sqlUUID = "SELECT uuid, device_name, installation_data, sn_number, band FROM device_info";
  let [uuidDeviceInfo, fieldsuuidDeviceInfo] = await conn.query(sqlUUID);

  if (uuidDeviceInfo.length > 0) {
    //uuidDeviceInfo.forEach( (value, i) => {
    for (let i = 0; i < uuidDeviceInfo.length; i++) {
      let params = uuidDeviceInfo[i].uuid;
      let sqlDataAVG =
        "SELECT totalenergy_sum  FROM tb_realtime";
      sqlDataAVG += " WHERE uuid_device_info = ?";
      let paramsdataAVG = [params];
      let [dataAVG, fieldsdataAVG] = await conn.query(
        sqlDataAVG,
        paramsdataAVG
      );
      if (dataAVG.length > 0) {
        device.push({
          id: i + 1,
          deviceName: uuidDeviceInfo[i].device_name,
          installation: uuidDeviceInfo[i].installation_data,
          sn: uuidDeviceInfo[i].sn_number,
          band: uuidDeviceInfo[i].band,
          energytotal: dataAVG[0].totalenergy_sum,
        });
      } else {
        device.push({
          id: i + 1,
          deviceName: uuidDeviceInfo[i].device_name,
          current: null,
          voltage: null,
          powertotal: null,
          energytotal: null,
        });
      }
    }
  }
  res.send([
    {
      myDevice: device,
    },
  ]);
});

app.get("/realtime", async (req, res) => {
  let conn = require("./connectmysql2");
  let realtime = [];
  // find uuid, device_name from device_info
  let sqlUUID =
    " SELECT uuid, installation_data, sn_number, band, series, remark FROM device_info WHERE device_name = ? ";
  let paramsUUID = req.query.device;
  let [uuidDeviceInfo, fieldsuuidDeviceInfo] = await conn.query(
    sqlUUID,
    paramsUUID
  );

  if (uuidDeviceInfo.length > 0) {
    let paramsRealtime = [uuidDeviceInfo[0].uuid];
    let sqlRealtime = "SELECT current_l1, current_l2, current_l3, current_avg,";
    sqlRealtime += " voltage_l1, voltage_l2, voltage_l3, voltage_avg,";
    sqlRealtime +=
      " activepower_l1, activepower_l2, activepower_l3, activepower_avg,";
    sqlRealtime +=
      " reactivepower_l1, reactivepower_l2, reactivepower_l3, reactivepower_avg,";
    sqlRealtime +=
      " powerfactor_l1, powerfactor_l2, powerfactor_l3, powerfactor_avg,";
    sqlRealtime +=
      " totalenergy_l1, totalenergy_l2, totalenergy_l3, totalenergy_sum,";
    sqlRealtime += " frequency  FROM tb_realtime";
    sqlRealtime += " WHERE uuid_device_info = ?";
    let [Realtime, fieldsRealtime] = await conn.query(
      sqlRealtime,
      paramsRealtime
    );

    if (Realtime[0] != undefined) {
      realtime.push(Realtime[0]);
    } else {
      realtime.push({
        current_l1: null,
        current_l2: null,
        current_l3: null,
        current_avg: null,
        voltage_l1: null,
        voltage_l2: null,
        voltage_l3: null,
        voltage_avg: null,
        activepower_l1: null,
        activepower_l2: null,
        activepower_l3: null,
        activepower_avg: null,
        reactivepower_l1: null,
        reactivepower_l2: null,
        reactivepower_l3: null,
        reactivepower_avg: null,
        powerfactor_l1: null,
        powerfactor_l2: null,
        powerfactor_l3: null,
        powerfactor_avg: null,
        totalenergy_l1: null,
        totalenergy_l2: null,
        totalenergy_l3: null,
        totalenergy_sum: null,
        frequency: null,
      });
    }
  }
  res.send([{ realtime: realtime[0], deviceInfo: uuidDeviceInfo[0] }]);
});

app.get("/historicaldata", async (req, res) => {
  let deviceSelected1 = req.query.deviceSelected1;
  let deviceSelected2 = req.query.deviceSelected2;
  let deviceSelected3 = req.query.deviceSelected3;
  let dataSelected1 = req.query.dataSelected1;
  let dataSelected2 = req.query.dataSelected2;
  let dataSelected3 = req.query.dataSelected3;
  let startTime = dayjs(req.query.startTime).format("YYYY-MM-DD HH:mm");
  let endTime = dayjs(req.query.endTime).format("YYYY-MM-DD HH:mm");
  let orderBy = req.query.orderBy;

  let timestamp = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let dataSelected;
  let dataTable = [];

  console.log(dataSelected1);

  let conn = require("./connectmysql2");

  let data = [
    { label: "Current_L1" },
    { label: "Current_L2" },
    { label: "Current_L3" },
    { label: "Current_N" },
    { label: "Voltage_L1" },
    { label: "Voltage_L2" },
    { label: "Voltage_L3" },
    { label: "ActivePower_L1" },
    { label: "ActivePower_L2" },
    { label: "ActivePower_L3" },
    { label: "ReactivePower_L1" },
    { label: "ReactivePower_L2" },
    { label: "ReactivePower_L3" },
    { label: "PowerFactor_L1" },
    { label: "PowerFactor_L2" },
    { label: "PowerFactor_L3" },
    { label: "Frequency" },
    { label: "TotalEnergy_Sum" },
  ];

  let historical = [];

  let input = [
    { deviceSelected: deviceSelected1, dataSelected: dataSelected1 },
    { deviceSelected: deviceSelected2, dataSelected: dataSelected2 },
    { deviceSelected: deviceSelected3, dataSelected: dataSelected3 },
  ];

  // find device_name from device_info
  let sqlDeviceName = " SELECT device_name AS label, uuid FROM device_info ";
  let [deviceName, fieldsDeviceName] = await conn.query(sqlDeviceName);

  for (let i = 0; i < input.length; i++) {
    dataSelected = input[i].dataSelected;
    if (
      input[i].deviceSelected != undefined &&
      input[i].dataSelected != undefined
    ) {
      let sqlHistoricaldata =
        " SELECT " +
        input[i].dataSelected +
        " AS data, timestamp FROM tb_energy";
      sqlHistoricaldata += " WHERE uuid_device_info = ?";
      sqlHistoricaldata += " AND timestamp BETWEEN ?";
      sqlHistoricaldata += " AND ?";
      sqlHistoricaldata += " ORDER BY timestamp " + orderBy;
      let paramsHistoricaldata = [input[i].deviceSelected, startTime, endTime];
      let [historicaldata, fieldsHistoricaldata] = await conn.query(
        sqlHistoricaldata,
        paramsHistoricaldata
      );

      historical.push(historicaldata);
      if (i === 0) {
        for (let ii = 0; ii < historicaldata.length; ii++) {
          timestamp.push(
            dayjs(historicaldata[ii].timestamp).format("DD/MM/YYYY HH:mm")
          );
          data1.push(historicaldata[ii].data);
        }
      }
      if (i === 1) {
        for (let ii = 0; ii < historicaldata.length; ii++) {
          data2.push(historicaldata[ii].data);
        }
      }
      if (i === 2) {
        for (let ii = 0; ii < historicaldata.length; ii++) {
          data3.push(historicaldata[ii].data);
        }
      }
    }
  }
  for (let i = 0; i < timestamp.length; i++) {
    dataTable.push({
      id: i + 1,
      timestamp: timestamp[i],
      data1: data1[i],
      data2: data2[i],
      data3: data3[i],
    });
  }
  res.send([
    {
      deviceName: deviceName,
      data: data,
      data1: data1,
      data2: data2,
      data3: data3,
      timestamp: timestamp,
      dataTable: dataTable,
    },
  ]);
});

app.get("/energyexport", async (req, res) => {
  let startTime = dayjs(req.query.startTime).format("YYYY-MM-DD HH:mm");
  let endTime = dayjs(req.query.endTime).format("YYYY-MM-DD HH:mm");
  let orderBy = req.query.orderBy;

  let device = [];
  let dataTable = [];
  let dataChart = [];

  let conn = require("./connectmysql2");

  let historical = [];

  // find device_name from device_info
  let sqlDeviceName = " SELECT device_name AS label, uuid FROM device_info ";
  let [deviceName, fieldsDeviceName] = await conn.query(sqlDeviceName);

  for (let i = 0; i < deviceName.length; i++) {
    let sqlMinTime = "SELECT totalenergy_sum FROM tb_energy ";
    sqlMinTime +=
      "WHERE timestamp = (SELECT MIN(timestamp) FROM tb_energy WHERE timestamp BETWEEN ? AND ? AND uuid_device_info = ?) ";
    sqlMinTime += "AND uuid_device_info = ?";
    let paramsMinTime = [
      startTime,
      endTime,
      deviceName[i].uuid,
      deviceName[i].uuid,
    ];
    let [minEnergy, fieldsMinEnergy] = await conn.query(
      sqlMinTime,
      paramsMinTime
    );

    let sqlMaxTime = "SELECT totalenergy_sum FROM tb_energy ";
    sqlMaxTime +=
      "WHERE timestamp = (SELECT MAX(timestamp) FROM tb_energy WHERE timestamp BETWEEN ? AND ? AND uuid_device_info = ?) ";
    sqlMaxTime += "AND uuid_device_info = ?";
    let paramsMaxTime = [
      startTime,
      endTime,
      deviceName[i].uuid,
      deviceName[i].uuid,
    ];
    let [maxEnergy, fieldsMaxEnergy] = await conn.query(
      sqlMaxTime,
      paramsMaxTime
    );

    if (minEnergy.length != 0 && maxEnergy.length != 0) {
      let total = numeral(
        maxEnergy[0].totalenergy_sum - minEnergy[0].totalenergy_sum
      ).format("0,0.0");
      let min = numeral(minEnergy[0].totalenergy_sum).format("0,0.0");
      let max = numeral(maxEnergy[0].totalenergy_sum).format("0,0.0");

      dataTable.push({
        id: i + 1,
        deviceName: deviceName[i].label,
        data1: total,
        data2: min,
        data3: max,
      });
      device.push(deviceName[i].label);
      dataChart.push(total);
    }
  }
  console.log(device);

  res.send([
    {
      dataTable: dataTable,
      device: device,
      dataChart: dataChart,
    },
  ]);
});

app.get("/dashboard", async (req, res) => {
  let conn = require("./connectmysql2");
  let dashboard = [];
  // find uuid, device_name from device_info
  let sqlUUID = " SELECT uuid FROM device_info WHERE device_name = ? ";
  let paramsUUID = req.query.deviceName;
  let [uuidDeviceInfo, fieldsuuidDeviceInfo] = await conn.query(
    sqlUUID,
    paramsUUID
  );

  if (uuidDeviceInfo.length > 0) {
    let paramsDashboard = [uuidDeviceInfo[0].uuid, uuidDeviceInfo[0].uuid];
    let sqlDashboard = "SELECT activepower_avg, totalenergy_sum FROM tb_energy";
    sqlDashboard += " WHERE uuid_device_info = ?";
    sqlDashboard +=
      " AND timestamp = ( SELECT MAX(timestamp) FROM tb_energy WHERE uuid_device_info = ? )";
    let [Dashboard, fieldsDashboard] = await conn.query(
      sqlDashboard,
      paramsDashboard
    );
    if (Dashboard[0] != undefined) {
      dashboard.push(Dashboard[0]);
    } else {
      dashboard.push([{ activepower_avg: null, totalenergy_sum: null }]);
    }
  }
  res.send(dashboard);
});

app.get("/editdeviceinfo", async (req, res) => {
  let conn = require("./connectmysql2");
  let installData = req.query.installData;
  let SNNumber = req.query.SNNumber;
  let band = req.query.band;
  let series = req.query.series;
  let remark = req.query.remark;
  let paramsDeviceName = req.query.device;

  let sqlDeviceName =
    " SELECT installation_data, sn_number, band, series, remark FROM device_info WHERE device_name = ? ";
  let [deviceInfo, fieldsDeviceInfo] = await conn.query(
    sqlDeviceName,
    paramsDeviceName
  );
  if (installData != undefined) {
    let paramsUpdate = [
      installData,
      SNNumber,
      band,
      series,
      remark,
      paramsDeviceName,
    ];
    let sqlUpdete =
      " UPDATE device_info SET  installation_data = ?, sn_number = ?, band = ?, series = ?, remark = ? WHERE device_name = ? ";
    let [rows, fields] = await conn.query(sqlUpdete, paramsUpdate);
  }
  res.send(deviceInfo);
});

app.get("/charttotalenergypeak", async (req, res) => {
  let conn = require("./connectmysql2");

  //past 24 Hr
  let date = dayjs().format("YYYY-MM-DD HH:mm");
  let date1 = dayjs().subtract(24, "hour").format("YYYY-MM-DD HH:00");
  let sqlTodayPeak = "";
  sqlTodayPeak += " SELECT peak, datetime  FROM tb_peak";
  sqlTodayPeak += " WHERE datetime BETWEEN ?";
  sqlTodayPeak += " AND ?";
  let paramsTodayPeak = [date1, date];
  let [rows1, fields1] = await conn.query(sqlTodayPeak, paramsTodayPeak);

  //past 7 day
  let daysub7 = dayjs().subtract(7, "day").format("YYYY-MM-DD HH:00");
  let sqldaysub7 = "";
  sqldaysub7 += " SELECT peak, datetime  FROM tb_peak";
  sqldaysub7 += " WHERE datetime BETWEEN ?";
  sqldaysub7 += " AND ?";
  let paramsdaysub7 = [daysub7, date];
  let [rows2, fields2] = await conn.query(sqldaysub7, paramsdaysub7);

  //past 30 day
  let daysub30 = dayjs().subtract(30, "day").format("YYYY-MM-DD HH:00");
  let sqldaysub30 = "";
  sqldaysub30 += " SELECT peak, datetime  FROM tb_peak";
  sqldaysub30 += " WHERE datetime BETWEEN ?";
  sqldaysub30 += " AND ?";
  let paramsdaysub30 = [daysub30, date];
  let [rows3, fields3] = await conn.query(sqldaysub30, paramsdaysub30);

  res.send([
    {
      arrHour: rows1,
      arr7day: rows2,
      arr30day: rows3,
    },
  ]);
});

app.get("/dashboardtotal", async (req, res) => {
  let conn = require("./connectmysql2");

  let d = dayjs().date();
  let m = dayjs().month() + 1;
  let y = dayjs().year();
  //maxPeak
  let sqlpeak =
    " SELECT peak, datetime FROM tb_peak WHERE peak = (SELECT DISTINCT MAX(peak) FROM tb_peak WHERE DAY(datetime) = ? AND MONTH(datetime) = ? AND YEAR(datetime) = ? )";
  let paramsPeak = [d, m, y];
  let [maxpeak, fieldsMaxpeak] = await conn.query(sqlpeak, paramsPeak);

  let sql = "SELECT uuid FROM device_info";
  let [uuid, fieldsUuid] = await conn.query(sql);
  let sumDay = 0;
  let energyDay = 0;
  let sumMonth = 0;
  let energyMonth = 0;
  let energy = 0;
  let sumEnergy = 0;

  if (uuid.length > 0) {
    for (let i = 0; i < uuid.length; i++) {
      let params = uuid[i].uuid;
      //totalday
      let sqlTotalEnergyPerDay = "SELECT energyperday FROM tb_energyperday";
      sqlTotalEnergyPerDay += " WHERE uuid_device_info = ?";
      sqlTotalEnergyPerDay +=
        " AND datetime = ( SELECT MAX(datetime) FROM tb_energyperday WHERE uuid_device_info = ? )";
      let paramsTotalEnergyPerDay = [params, params];
      let [dataTotalEnergyPerDay, fieldsTotalEnergyPerDay] = await conn.query(
        sqlTotalEnergyPerDay,
        paramsTotalEnergyPerDay
      );
      if (dataTotalEnergyPerDay.length > 0) {
        energyDay = dataTotalEnergyPerDay[0].energyperday;
        sumDay = numeral(sumDay + energyDay).format("0,0.0");
      }

      //totalmonth
      let sqlTotalEnergyPerMonth =
        "SELECT energypermonth FROM tb_energypermonth";
      sqlTotalEnergyPerMonth += " WHERE uuid_device_info = ?";
      sqlTotalEnergyPerMonth +=
        " AND datetime = ( SELECT MAX(datetime) FROM tb_energypermonth WHERE uuid_device_info = ? )";
      let paramsTotalEnergyPerMonth = [params, params];
      let [dataTotalEnergyPerMonth, fieldsTotalEnergyPerMonth] =
        await conn.query(sqlTotalEnergyPerMonth, paramsTotalEnergyPerMonth);
      if (dataTotalEnergyPerMonth.length > 0) {
        energyMonth = dataTotalEnergyPerMonth[0].energypermonth;
        sumMonth = numeral(sumMonth + energyMonth).format("0,0.0");
      }

      //energy
      let sqlEnergy = "SELECT MAX(totalenergy_sum) AS data FROM tb_energy";
      sqlEnergy += " WHERE uuid_device_info = ?";
      let [dataEnergy, fieldsEnergy] = await conn.query(sqlEnergy, params);
      if (dataEnergy.length > 0) {
        energy = dataEnergy[0].data;
        sumEnergy = sumEnergy + energy;
      }
    }
  }

  //let dayTtoDay = sumEnergy - sumDay
  let dayTtoDay = numeral(sumEnergy - sumDay).format("0,0.0");
  //let monthToMonth = sumEnergy - sumMonth
  let monthToMonth = numeral(sumEnergy - sumMonth).format("0,0.0");
  res.send([
    {
      maxpeak: maxpeak,
      sumday: sumDay,
      summonth: sumMonth,
      daytoday: dayTtoDay,
      monthtomonth: monthToMonth,
    },
  ]);
});

app.get("/user", async (req, res) => {
  let conn = require("./connectmysql2");
  let user = [];

  let sqlID = "SELECT id FROM users";
  let [id, fieldId] = await conn.query(sqlID);

  if (id.length > 0) {
    for (let i = 0; i < id.length; i++) {
      let params = id[i].id;
      let sqlUser = "SELECT id, fname, lname, email  FROM users";
      sqlUser += " WHERE id = ?";
      let paramsUser = [params];
      let [qUser, fieldsQuser] = await conn.query(sqlUser, paramsUser);
      if (qUser.length > 0) {
        user.push({
          id: qUser[0].id,
          fname: qUser[0].fname,
          lname: qUser[0].lname,
          email: qUser[0].email,
        });
      } else {
        user.push({
          id: null,
          fname: null,
          lname: null,
          email: null,
        });
      }
    }
  }
  res.send([
    {
      user: user,
    },
  ]);
});

app.get("/deleteuser", async (req, res) => {
  let conn = require("./connectmysql2");
  let user = [];
  let idd = req.query.id;

  let sqlDeleteUser = "DELETE FROM users WHERE id = ?";
  let paramsDeleteUser = idd;
  let [deleteUser, fieldDeleteUser] = await conn.query(
    sqlDeleteUser,
    paramsDeleteUser
  );

  let sqlID = "SELECT id FROM users";
  let [id, fieldId] = await conn.query(sqlID);

  if (id.length > 0) {
    for (let i = 0; i < id.length; i++) {
      let params = id[i].id;
      let sqlUser = "SELECT id, fname, lname, email  FROM users";
      sqlUser += " WHERE id = ?";
      let paramsUser = [params];
      let [qUser, fieldsQuser] = await conn.query(sqlUser, paramsUser);
      if (qUser.length > 0) {
        user.push({
          id: qUser[0].id,
          fname: qUser[0].fname,
          lname: qUser[0].lname,
          email: qUser[0].email,
        });
      } else {
        user.push({
          id: null,
          fname: null,
          lname: null,
          email: null,
        });
      }
    }
  }
  res.send([
    {
      user: user,
    },
  ]);
});

// perhour
cron.schedule("59 */1 * * *", async () => {
  let conn = require("./connectmysql2");
  let arr = [];
  // find uuid from tb_energy
  let sql = "SELECT DISTINCT uuid_device_info FROM tb_energy";
  let [rows, fields] = await conn.query(sql);
  let uuidDeviceInfo = rows;
  if (uuidDeviceInfo.length > 0) {
    for (let i = 0; i < uuidDeviceInfo.length; i++) {
      // select new data from device
      let params = uuidDeviceInfo[i].uuid_device_info;
      let sqlEnergy = "SELECT MAX(totalenergy_sum) AS data FROM tb_energy";
      sqlEnergy += " WHERE uuid_device_info = ?";
      let [dataEnergy, fieldsEnergy] = await conn.query(sqlEnergy, params);

      // select new data from energyperday
      let sqlEnergyPerHour = "SELECT energylasthour FROM tb_energyperhour";
      sqlEnergyPerHour += " WHERE uuid_device_info = ?";
      sqlEnergyPerHour +=
        " AND datetime = ( SELECT MAX(datetime) FROM tb_energyperhour WHERE uuid_device_info = ? )";
      let paramsEnergyPerHour = [params, params];
      let [dataEnergyPerHour, fieldsEnergyPerHour] = await conn.query(
        sqlEnergyPerHour,
        paramsEnergyPerHour
      );
      // check is not data
      if (dataEnergyPerHour.length > 0) {
        let newData = dataEnergy[0].data;
        let dataLastHour = dataEnergyPerHour[0].energylasthour;
        let energyPerHour = newData - dataLastHour;

        let paramsInserEnergyPerHour = [energyPerHour, newData, params];
        let sqlInserEnergyPerHour =
          "INSERT INTO tb_energyperhour(datetime, energyperhour, energylasthour, uuid_device_info) VALUES (NOW(), ?, ?, ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserEnergyPerHour,
          paramsInserEnergyPerHour
        );
      } else {
        let newData = dataEnergy[0].data;
        let paramsInserNoData = [newData, newData, params];
        let sqlInserNoData =
          "INSERT INTO tb_energyperhour(datetime, energyperhour, energylasthour, uuid_device_info) VALUES (NOW(), '?', '?', ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserNoData,
          paramsInserNoData
        );
      }
    }
  } else {
    console.log("no energy data");
  }
});

// perday
cron.schedule("59 23 */1 * *", async () => {
  let conn = require("./connectmysql2");

  // find uuid from tb_energy
  let sql = "SELECT DISTINCT uuid_device_info FROM tb_energy";
  let [rows, fields] = await conn.query(sql);
  let uuidDeviceInfo = rows;
  if (uuidDeviceInfo.length > 0) {
    for (let i = 0; i < uuidDeviceInfo.length; i++) {
      // select new data from device
      let params = uuidDeviceInfo[i].uuid_device_info;
      let sqlEnergy = "SELECT MAX(totalenergy_sum) AS data FROM tb_energy";
      sqlEnergy += " WHERE uuid_device_info = ?";
      let [dataEnergy, fieldsEnergy] = await conn.query(sqlEnergy, params);

      // select new data from energyperday
      let sqlEnergyPerDay = "SELECT energylastday FROM tb_energyperday";
      sqlEnergyPerDay += " WHERE uuid_device_info = ?";
      sqlEnergyPerDay +=
        " AND datetime = ( SELECT MAX(datetime) FROM tb_energyperday WHERE uuid_device_info = ? )";
      let paramsEnergyPerDay = [params, params];
      let [dataEnergyPerDay, fieldsEnergyPerDay] = await conn.query(
        sqlEnergyPerDay,
        paramsEnergyPerDay
      );
      // check is not data
      if (dataEnergyPerDay.length > 0) {
        let newData = dataEnergy[0].data;
        let dataLastDay = dataEnergyPerDay[0].energylastday;
        let energyPerDay = newData - dataLastDay;

        let paramsInserEnergyPerDay = [energyPerDay, newData, params];
        let sqlInserEnergyPerDay =
          "INSERT INTO tb_energyperday(datetime, energyperday, energylastday, uuid_device_info) VALUES (NOW(), ?, ?, ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserEnergyPerDay,
          paramsInserEnergyPerDay
        );
      } else {
        let newData = dataEnergy[0].data;
        let paramsInserNoData = [newData, newData, params];
        let sqlInserNoData =
          "INSERT INTO tb_energyperday(datetime, energyperday, energylastday, uuid_device_info) VALUES (NOW(), '?', '?', ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserNoData,
          paramsInserNoData
        );
      }
    }
  } else {
    console.log("no energy data");
  }
});

//var cron = require('node-cron');
let day = dayjs().format("YYYY-MM-DD");
let daysInmonth = dayjs(day).daysInMonth();
//let d = dayjs().date();

// permonth
cron.schedule(`59 23 ${daysInmonth} * * `, async () => {
  let conn = require("./connectmysql2");
  let arr = [];
  // find uuid from tb_energy
  let sql = "SELECT DISTINCT uuid_device_info FROM tb_energy";
  let [rows, fields] = await conn.query(sql);
  let uuidDeviceInfo = rows;
  if (uuidDeviceInfo.length > 0) {
    for (let i = 0; i < uuidDeviceInfo.length; i++) {
      // select new data from device
      let params = uuidDeviceInfo[i].uuid_device_info;
      let sqlEnergy = "SELECT MAX(totalenergy_sum) AS data FROM tb_energy";
      sqlEnergy += " WHERE uuid_device_info = ?";
      let [dataEnergy, fieldsEnergy] = await conn.query(sqlEnergy, params);

      // select new data from energyperday
      let sqlEnergyPerMonth = "SELECT energylastmonth FROM tb_energypermonth";
      sqlEnergyPerMonth += " WHERE uuid_device_info = ?";
      sqlEnergyPerMonth +=
        " AND datetime = ( SELECT MAX(datetime) FROM tb_energypermonth WHERE uuid_device_info = ? )";
      let paramsEnergyPerMonth = [params, params];
      let [dataEnergyPerMonth, fieldsEnergyPerMonth] = await conn.query(
        sqlEnergyPerMonth,
        paramsEnergyPerMonth
      );
      // check is not data
      if (dataEnergyPerMonth.length > 0) {
        let newData = dataEnergy[0].data;
        let dataLastMonth = dataEnergyPerMonth[0].energylastmonth;
        let energyPerMonth = newData - dataLastMonth;

        let paramsInserEnergyPerMonth = [energyPerMonth, newData, params];
        let sqlInserEnergyPerMonth =
          "INSERT INTO tb_energypermonth(datetime, energypermonth, energylastmonth, uuid_device_info) VALUES (NOW(), ?, ?, ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserEnergyPerMonth,
          paramsInserEnergyPerMonth
        );
      } else {
        let newData = dataEnergy[0].data;
        let paramsInserNoData = [newData, newData, params];
        let sqlInserNoData =
          "INSERT INTO tb_energypermonth(datetime, energypermonth, energylastmonth, uuid_device_info) VALUES (NOW(), '?', '?', ?)";
        let [rows1, fields1] = await conn.query(
          sqlInserNoData,
          paramsInserNoData
        );
      }
    }
  } else {
    console.log("no energy data");
  }
});

app.listen(3333, function () {
  console.log("CORS-enabled web server listening on port 3333");
});
