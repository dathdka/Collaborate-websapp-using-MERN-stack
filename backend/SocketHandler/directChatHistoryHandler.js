
const conversation = require('../models/conversation');
const chatUpdate = require('./update/chat');

const directChatHistoryHandler = async (socket, data) =>{
    try{
        const {userId} = socket.user;
        const {receiverUserId} = data;

        const Conversation = await conversation.findOne({
            participants: {$all: [userId, receiverUserId]},
            type: 'DIRECT'
        });
        if(Conversation){
            chatUpdate.updateChatHistory(Conversation._id.toString(),socket.id);
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = directChatHistoryHandler;