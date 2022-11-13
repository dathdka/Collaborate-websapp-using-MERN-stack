const serverStore = require("../serverStore")
const roomsUpdate = require('./update/rooms')

const roomLeaveHandler = (socket, data) =>{
    const {roomId} = data

    const activeRoom = serverStore.getActiveRoom(roomId)
    if(activeRoom){
        serverStore.leaveActiveRoom(roomId, socket.id)
        roomsUpdate.updateRooms()
    }
}

module.exports = roomLeaveHandler