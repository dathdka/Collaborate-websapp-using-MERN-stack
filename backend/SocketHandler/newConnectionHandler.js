const serverStore = require("../serverStore");
const update = require('./update/friends');
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  update.updateFriendsPendingInvitation(userDetails.userId);
};

module.exports = {
  newConnectionHandler,
};
