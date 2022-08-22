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

const updateFriends = async (userId) =>{
    try{
        const receiverList = serverStore.getActiveConnections(userId);
        if(receiverList.length > 0){

            const User = await user.findById(userId, {_id: 1, friends: 1}).populate(
                'friends', 
                '_id username mail'
            ); 

            if(User){
                const friendList = User.friends.map(f=>{
                    return {
                        id: f._id,
                        mail: f.mail,
                        username: f.username
                    }
                });
                const io = serverStore.getSocketServerInstance();
        
                receiverList.forEach(receiverSocketId =>{
                    io.to(receiverSocketId).emit('friend-list',{
                        friends: friendList ? friendList : []
                    });
                });
            }
        }
    }catch(error){
        console.log(error);
    }
    

}

module.exports= {
    updateFriendsPendingInvitation,
    updateFriends
}