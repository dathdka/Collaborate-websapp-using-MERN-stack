const friendInvitation = require("../../models/friendInvitation");
const updateFriends = require('../../SocketHandler/update/friends');
const user = require('../../models/user');

const postAccept = async (req,res) =>{
    try{
        const {id} = req.body;
        const invitationExists = await friendInvitation.findById(id);
        if(!invitationExists){
            return res.status(401).send('something went wrong!');
        }
        const {senderId, receiverId} = invitationExists;
        const user1 = await user.findById(senderId);
        user1.friends = [...user1.friends, receiverId]; 

        const user2 = await user.findById(receiverId);
        user2.friends = [...user2.friends, senderId];

        await user1.save();
        await user2.save();

        await friendInvitation.findByIdAndDelete(id);

        updateFriends.updateFriends(senderId.toString());
        updateFriends.updateFriends(receiverId.toString());

        updateFriends.updateFriendsPendingInvitation(receiverId.toString());

        return res.status(200).send('accepted');
    }catch(error){
        return res.status(500).send('fail');
    }
}

module.exports = postAccept;