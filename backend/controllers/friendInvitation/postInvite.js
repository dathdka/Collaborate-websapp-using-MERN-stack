const friendInvitation = require("../../models/friendInvitation");
const user = require("../../models/user");
const update = require('../../SocketHandler/update/friends');
const postInvite = async(req, res) =>{
    const {targetMailAddress}  = req.body;
    const {userId, mail} = req.user;
    if(mail.toLowerCase()=== targetMailAddress.toLowerCase()){
        return res.status(409).send('invalid email');
    }

    const targetUser = await user.findOne({
        mail: targetMailAddress.toLowerCase()
    })  
    if(!targetUser){
        return res.status(404).send(`${targetMailAddress} not exsist`)
    }


    const invitationAlreadyReceived = await friendInvitation.findOne({
        senderId: userId ,
        receiverId: targetUser._id,
    });
    if(invitationAlreadyReceived){
        return res.status(409).send('Already sent');
    }

    const ourFriend = targetUser.friends.find((friendId)=> 
        friendId.toString() === userId.toString());
    if(ourFriend){
        return res.status(409).send(`you are already friend with ${targetMailAddress}`)
    }
    
    const newInvitation = await friendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    });


    update.updateFriendsPendingInvitation(targetUser._id.toString());
    
    return res.status(201).send('invite has been sent');
}

module.exports = postInvite;