const user = require('../../models/user');
const friendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitation = async (userId) =>{
    try {
        const pendingInvitations = await friendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username mail');

        const receiverList = serverStore.getActiveConnections(userId);

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach(receiverSocketId =>{
            io.to(receiverSocketId).emit('friend-invitations',{
                pendingInvitations: pendingInvitations ? pendingInvitations : [],
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports= {
    updateFriendsPendingInvitation
}