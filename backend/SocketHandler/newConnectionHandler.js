const serverStore = require("../serverStore");
const update = require('./update/friends');
const roomsUpdate = require('./update/rooms')
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
  update.updateFriends(userDetails.userId);
  update.updateFriendsPendingInvitation(userDetails.userId);
  setTimeout(()=>{
    roomsUpdate.updateRooms(socket.id)
  },[500])

};

module.exports = {
  newConnectionHandler,
};
