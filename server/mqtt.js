let mqtt = require("mqtt");
let conn = require("./connectmysql1");
const url = "tcp://hypetex.southeastasia.cloudapp.azure.com";

//const fs = require('fs');
//var caFile = fs.readFileSync("ca.crt");
//var KEY = fs.readFileSync('client-certs\\client.key');
//var CERT = fs.readFileSync('client-certs\\client.crt');

const options = {
  port: "1883",
  //clientId: ,
  connectTimeout: 4000,
  username: "gw1",
  password: "gw1@1122",
  //rejectUnauthorized : false,
  //key: KEY,
  //cert: CERT,
  //ca:caFile,
  reconnectPeriod: 1000,
};

let client = mqtt.connect(url, options);

client.on("connect", function () {
  console.log("connected flag  " + client.connected);

  // client.subscribe("hypetex", { qos: 1 }, function () {
  //   console.log("Subscribe to topic");
  // });
});

client.on("message", function (topic, message, packet) {
  let obj = JSON.parse(message);
  let peak = 0
  let active = 0
  obj.device.forEach((value, i) => {
    let convIP = obj.device[i].conv_ip;
    let sensorID = obj.device[i].sensor_id;

    active = obj.device[i].data.activepower_total
    peak = active + peak;

    let paramsSelectUUID = [convIP, sensorID];
    let sqlSelectUUID =
      "SELECT uuid FROM device_info WHERE device_conv_ip = ? AND sensor_id = ?";
    conn.query(sqlSelectUUID, paramsSelectUUID, (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        
        let paramsInsertData = [
          result[0].uuid,
          obj.device[i].data.current_l1,
          obj.device[i].data.current_l2,
          obj.device[i].data.current_l3,
          obj.device[i].data.current_avg,
          obj.device[i].data.voltage_l1,
          obj.device[i].data.voltage_l2,
          obj.device[i].data.voltage_l3,
          obj.device[i].data.voltage_avg,
          obj.device[i].data.activepower_l1,
          obj.device[i].data.activepower_l2,
          obj.device[i].data.activepower_l3,
          obj.device[i].data.activepower_total,
          obj.device[i].data.reactivepower_l1,
          obj.device[i].data.reactivepower_l2,
          obj.device[i].data.reactivepower_l3,
          obj.device[i].data.reactivepower_total,
          obj.device[i].data.powerfactor_l1,
          obj.device[i].data.powerfactor_l2,
          obj.device[i].data.powerfactor_l3,
          obj.device[i].data.powerfactor_avg,
          obj.device[i].data.totalenergy_l1,
          obj.device[i].data.totalenergy_l2,
          obj.device[i].data.totalenergy_l3,
          obj.device[i].data.totalenergy_sum,
          obj.device[i].data.frequency
        ];
        let sqlInsertData = "";
        sqlInsertData += " INSERT INTO tb_energy(timestamp, uuid_device_info,"
        sqlInsertData += " current_l1, current_l2, current_l3, current_avg,"
        sqlInsertData += " voltage_l1, voltage_l2, voltage_l3, voltage_avg,"
        sqlInsertData += " activepower_l1, activepower_l2, activepower_l3, activepower_avg,"
        sqlInsertData += " reactivepower_l1, reactivepower_l2, reactivepower_l3, reactivepower_avg,"
        sqlInsertData += " powerfactor_l1, powerfactor_l2, powerfactor_l3, powerfactor_avg,"
        sqlInsertData += " totalenergy_l1, totalenergy_l2, totalenergy_l3, totalenergy_sum,"
        sqlInsertData += " frequency) VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        conn.query(sqlInsertData, paramsInsertData, (err, result) => {
          if (err) throw err;
        });

        let paramsUpdateData = [
          obj.device[i].data.current_l1,
          obj.device[i].data.current_l2,
          obj.device[i].data.current_l3,
          obj.device[i].data.current_avg,
          obj.device[i].data.voltage_l1,
          obj.device[i].data.voltage_l2,
          obj.device[i].data.voltage_l3,
          obj.device[i].data.voltage_avg,
          obj.device[i].data.activepower_l1,
          obj.device[i].data.activepower_l2,
          obj.device[i].data.activepower_l3,
          obj.device[i].data.activepower_total,
          obj.device[i].data.reactivepower_l1,
          obj.device[i].data.reactivepower_l2,
          obj.device[i].data.reactivepower_l3,
          obj.device[i].data.reactivepower_total,
          obj.device[i].data.powerfactor_l1,
          obj.device[i].data.powerfactor_l2,
          obj.device[i].data.powerfactor_l3,
          obj.device[i].data.powerfactor_avg,
          obj.device[i].data.totalenergy_l1,
          obj.device[i].data.totalenergy_l2,
          obj.device[i].data.totalenergy_l3,
          obj.device[i].data.totalenergy_sum,
          obj.device[i].data.frequency,
          result[0].uuid,
        ];
        let sqlUpdateData = "";
        sqlUpdateData += " UPDATE tb_realtime"
        sqlUpdateData += " SET timestamp = NOW(),"
        sqlUpdateData += " current_l1 = ?, current_l2 = ?, current_l3 = ?, current_avg = ?,"
        sqlUpdateData += " voltage_l1 = ?, voltage_l2 = ?, voltage_l3 = ?, voltage_avg = ?,"
        sqlUpdateData += " activepower_l1 = ?, activepower_l2 = ?, activepower_l3 = ?, activepower_avg = ?,"
        sqlUpdateData += " reactivepower_l1 = ?, reactivepower_l2 = ?, reactivepower_l3 = ?, reactivepower_avg = ?,"
        sqlUpdateData += " powerfactor_l1 = ?, powerfactor_l2 = ?, powerfactor_l3 = ?, powerfactor_avg = ?,"
        sqlUpdateData += " totalenergy_l1 = ?, totalenergy_l2 = ?, totalenergy_l3 = ?, totalenergy_sum = ?,"
        sqlUpdateData += " frequency = ? "
        sqlUpdateData += " WHERE uuid_device_info = ?"
        conn.query(sqlUpdateData, paramsUpdateData, (err, result) => {
          if (err) throw err;
        });
      }
    });
  });


  let sqlPeak = "INSERT INTO tb_peak (datetime, peak) VALUES (NOW(), ?)"
  let paramsPeak = [peak];
  conn.query(sqlPeak, paramsPeak, (err, result) => {
    if (err) throw err;
  });


  //if (topic == hypetex) {
  // for (let key in obj) {
  //   console.log(key)
  //   // let paramsSelectUUID = ["192.168.1.155", Number(key.substring(1))];
  //   // let sqlSelectUUID =
  //   //   "SELECT uuid FROM device_info WHERE device_conv_ip = ? AND sensor_id = ?";
  //   // conn.query(sqlSelectUUID, paramsSelectUUID, (err, result) => {
  //   //   if (err) throw err;

  //   //   if (result.length > 0) {
  //   //     let paramsInsertData = [obj[key], result[0].uuid];
  //   //     let sqlInsertData =
  //   //       "INSERT INTO tb_energy(timestamp, data, uuid_device_info) VALUES (NOW(), ?, ?)";
  //   //     conn.query(sqlInsertData, paramsInsertData, (err, result) => {
  //   //       if (err) throw err;
  //   //     });
  //   //   }
  //   // });
  // }
  //}
  // if (topic == 156) {
  //   for (let key in obj) {
  //     let paramsSelectUUID = ["192.168.1.156", Number(key.substring(1))];
  //     let sqlSelectUUID =
  //       "SELECT uuid FROM device_info WHERE device_conv_ip = ? AND sensor_id = ?";
  //     conn.query(sqlSelectUUID, paramsSelectUUID, (err, result) => {
  //       if (err) throw err;

  //       if (result.length > 0) {
  //         let paramsInsertData = [obj[key], result[0].uuid];
  //         let sqlInsertData =
  //           "INSERT INTO tb_energy(timestamp, data, uuid_device_info) VALUES (NOW(), ?, ?)";
  //         conn.query(sqlInsertData, paramsInsertData, (err, result) => {
  //           if (err) throw err;
  //         });
  //       }
  //     });
  //   }
  // }
  
});

client.on("error", function (error) {
  console.log("Can't connect" + error);
  //process.exit(1)
});

// function publish() {
//   console.log("publishing", "123");
//   if (client.connected == true) {
//     client.publish("test", "function", { qos: 0, retain: false });
//   }
// }

client.subscribe("hypetex/demo01", { qos: 1 }); //single topic
//client.subscribe("156", { qos: 1 }); //single topic

/*
setInterval(() => {
    //client.publish("test", "hello from NodeJS");
    client.publish('test', 'my message', { qos: 0, retain: false }, function(error) {
        if (error) {
            console.error(error)
        }
        //client.end();
    });

}, 5000);
*/

//notice this is printed even before we connect
console.log("end of script");
