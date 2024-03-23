const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require('dotenv').config();
const { readdirSync } = require("fs");
const connectDB = require('./config/db');


const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');

// job interval
const cron = require("node-cron");
// const { daily } = require('./controllers/jobInsertdata')

const http = require('http');
const socketIo = require('socket.io');
const socket = require('./controllers/socket')

const app = express();

// ConnectDB
connectDB();

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// socket.io
socket(io);

// ConnectMQTT
// connectMQTT(io);

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use('/uploads',express.static('uploads'))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));


// cron.schedule('*/15 * * * * *', () => {
//   daily();
// });


const port = process.env.PORT;

server.listen(port, () => {
  console.log("Server is runnig on port " + port);
});


