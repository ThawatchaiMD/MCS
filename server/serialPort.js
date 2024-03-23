const { SerialPort, ReadlineParser, InterByteTimeoutParser, DelimiterParser } = require("serialport");


const cron = require("node-cron");

SerialPort.list().then(function (data) {
  console.log(data);  
});

const port = new SerialPort(
  {
    path: "COM8",
    baudRate: 19200,
  },
  function (err) {
    if (err) {
      return console.log("Error: ", err.message);
    }
  }
);

// const parser = new ReadlineParser();
const parser = port.pipe(new ReadlineParser());
// port.pipe(parser);
parser.on('data', console.log)

// port.open(function (err) {
//     if (err) {
//       return console.log('Error opening port: ', err.message)
//     }

//     // Because there's no callback to write, write errors will be emitted on the port:
//     port.write('main screen turn on')
//   })


// parser.on("data", (line) => {
//   console.log('\n---------------- data ON -------------------------');
//   console.log(line);
//   console.log('---------------- data End ------------------------')
// });

cron.schedule("*/5 * * * * *", () => {
  port.write(Buffer.from("0501fe", "hex"));
});
