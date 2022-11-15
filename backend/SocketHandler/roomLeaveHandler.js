const serverStore = require("../serverStore");
const roomsUpdate = require("./update/rooms");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  const activeRoom = serverStore.getActiveRoom(roomId);

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = serverStore.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    roomsUpdate.updateRooms();
  }
};

module.exports = roomLeaveHandler;
