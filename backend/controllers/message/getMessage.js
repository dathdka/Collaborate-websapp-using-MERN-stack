const message = require('../../models/message');
const conversation = require('../../models/conversation');

const getMessage = async(req,res) =>{
    const  userId = req.body.id;
    
    const Conversation = await conversation.find({
        participants: {$all: [userId]},
        type: 'DIRECT'
    }).populate('participants messages');
    var list= [];
    var obj;
    if(Conversation){
        Conversation.forEach((f,index) => {
            obj = {username : '', messages: ''};
            f.participants.forEach(user =>{
                if(user._id != userId)
                    obj.username = user.username
                    // console.log(user.username)
            })
            obj.messages = f.messages.length;
            // console.log(f.messages.length);
            // console.log(obj)
            list.push(obj)
        })
    }

    return res.json({
        data : list
    })
}

module.exports = getMessage;
