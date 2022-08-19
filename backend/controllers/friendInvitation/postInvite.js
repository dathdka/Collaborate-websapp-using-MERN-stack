const friendInvitation = require("../../models/friendinvitation");
const user = require("../../models/user");

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
        receiverId: targetUser,
    });
    if(invitationAlreadyReceived){
        return res.status(409).send('Already sent');
    }

    const ourFriend = targetUser.friends.find((fiendId)=> 
        friendId.toString() === userId.toString());
    if(ourFriend){
        return res.status(409).send(`you are already friend with ${targetMailAddress}`)
    }
    

    return res.send('controller is working');
}

module.exports = postInvite;