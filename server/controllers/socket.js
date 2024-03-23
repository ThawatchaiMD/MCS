const socket = async (io) => {
  try {
    io.on("connection", (socket) => {
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`Joined Room: ${room}`);
      });

      socket.on("typing", (room) => {
        console.log(room);
        socket.in(room).emit("typing");
      });

      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("leaveRoom", (roomName) => {
        socket.leave(roomName);
        console.log(`Leave Room: ${roomName}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = socket;
