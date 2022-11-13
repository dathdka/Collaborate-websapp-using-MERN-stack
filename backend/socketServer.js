const authSocket = require("./midleware/authSocket");
const {
  newConnectionHandler,
} = require("./SocketHandler/newConnectionHandler");
const disconnectHandler = require("./SocketHandler/disconnectHandler");
const directMessageHandler = require('./SocketHandler/directMessageHandler');
const directChatHistoryHandler = require('./SocketHandler/directChatHistoryHandler');
const directDrawHistory = require('./SocketHandler/directDrawHistory');
const roomCreateHandler = require('./SocketHandler/roomCreateHandler')
const roomJoinHandler = require('./SocketHandler/roomJoinHandler')
const roomLeaveHandler = require('./SocketHandler/roomLeaveHandler')

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
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {

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

    socket.on('room-create', ()=>{
      roomCreateHandler(socket)
    })

    socket.on('room-join', (data)=>{
      roomJoinHandler(socket,data);
    })
    
    socket.on('room-leave', data =>{
      roomLeaveHandler(socket,data)
    })

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
