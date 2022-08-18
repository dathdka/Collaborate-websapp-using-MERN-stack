const authSocket = require("./midleware/authSocket");
const {newConnectionHandler} = require('./SocketHandler/newConnectionHandler');

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  
  
  io.use((socket, next) => {
    console.log('check token');
    console.log(socket);
    authSocket(socket, next);
    
  });
  
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
  });
  console.log(io.connected);

};

module.exports = {
    registerSocketServer,
  };