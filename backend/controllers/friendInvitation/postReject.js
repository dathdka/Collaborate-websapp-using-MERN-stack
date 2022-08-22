const friendInvitation = require("../../models/friendInvitation");
const updateFriends = require('../../SocketHandler/update/friends');

const postReject = async (req,res) =>{
    try{
        const {id} = req.body;
        const {userId} = req.user;

        const invitationExists = await friendInvitation.exists({_id: id});
        if(invitationExists){
            await friendInvitation.findByIdAndDelete(id);
        }

        updateFriends.updateFriendsPendingInvitation(userId);

        return res.status(200).send('rejected');
    }catch(error){
        return res.status(500).send('fail');
    }
    
}

module.exports = postReject;