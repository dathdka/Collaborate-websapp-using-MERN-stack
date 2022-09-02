const authSocket = require("./midleware/authSocket");
const {
  newConnectionHandler,
} = require("./SocketHandler/newConnectionHandler");
const disconnectHandler = require("./SocketHandler/disconnectHandler");
const directMessageHandler = require('./SocketHandler/directMessageHandler');
const directChatHistoryHandler = require('./SocketHandler/directChatHistoryHandler');
const directDrawHistory = require('./SocketHandler/directDrawHistory');
const serverStore = require("./serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    console.log("check token");
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    // console.log("user connected");
    // console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();
    
    socket.on('direct-message', (data) =>{
      directMessageHandler(socket,data);
    });

    socket.on('direct-chat-history',(data) =>{
      directChatHistoryHandler(socket,data);
    });

    socket.on('send-draw',(data) =>{
      directDrawHistory(socket,data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });


  });

  setInterval (() =>{
    emitOnlineUsers();
  },[180000]);
};

module.exports = {
  registerSocketServer,
};
