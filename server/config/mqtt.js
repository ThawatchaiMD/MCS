let mqtt = require("mqtt");
const url = "tcp://119.59.105.226";
const { setupMQTTListener } = require("../controllers/mqtt");

const connectMQTT = async (io) => {
  try {
    const options = {
      port: "1883",
      //clientId: ,
      connectTimeout: 4000,
      username: "admin",
      password: "admin",
      //rejectUnauthorized : false,
      //key: KEY,
      //cert: CERT,
      //ca:caFile,
      reconnectPeriod: 1000,
    };

    let client = mqtt.connect(url, options);

    client.on("connect", function () {
      console.log("connected flag  " + client.connected);
    });

    client.on("message", async function (topic, message, packet) {
      try {
        const parts = topic.split("/");
        const deviceID = parts[1];
        const parsedMessage = JSON.parse(message);
        io.in(deviceID).emit("message recieved", parsedMessage);
        await setupMQTTListener(topic, message, packet);
      } catch (error) {
        console.log(error);
      }
    });

    client.on("error", function (error) {
      console.log("Can't connect" + error);
      //process.exit(1)
    });

    //client.subscribe(["AAA/GW04/device02", "AAA/GW03/device01", "AAA/GW03/device02", "AAA/GW03/device03"], { qos: 1 });
    //client.subscribe("hypetex/#", { qos: 1 });
    client.subscribe(["hypetex/test01", "hypetex/test02"], { qos: 1 });
    return client;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectMQTT;

// const mqtt = require("mqtt");
// const url = "tcp://hypetex.southeastasia.cloudapp.azure.com";
// const { setupMQTTListener } = require("../controllers/mqtt");
// const { getTopic, topic } = require("../controllers/topic");

// const connectMQTT = async () => {
//   try {
//     const options = {
//       port: "1883",
//       connectTimeout: 4000,
//       username: "gw1",
//       password: "gw1@1122",
//       reconnectPeriod: 1000,
//     };

//     let client = mqtt.connect(url, options);
//     let listTopic;

//     client.on("connect", async () => {
//       console.log("Connected to MQTT broker");

//       client.subscribe(listTopic, (err, granted) => {
//         if (err) {
//           console.log(err, "err");
//         }
//         console.log(granted, "granted");
//       });
//     });

//     client.on("message", async function (topic, message, packet) {
//       try {
//         console.log("Received message on topic:", topic);
//         await setupMQTTListener(topic, message, packet);

//         client.subscribe(listTopic, (err, granted) => {
//           if (err) {
//             console.log(err, "err");
//           }
//           console.log(granted, "granted");
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     client.on("error", function (error) {
//       console.log("Can't connect" + error);
//     });

//     return client;
//   } catch (err) {
//     console.log(err);
//   }
// };

//module.exports = connectMQTT;
