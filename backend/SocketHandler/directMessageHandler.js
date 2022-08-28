
const conversation = require('../models/conversation');
const message = require ('../models/message');
const chatUpdate = require('./update/chat');

const directMessageHandler = async (socket, data) =>{
    console.log('handle messages is working');
    try{
        const {userId} = socket.user;

        const {receiverUserId,content} = data;
        var dat = new Date();
        const Message = await message.create({
            content: content,
            authorId: userId,
            date: dat,
            time: dat.getHours()+":"+dat.getMinutes(),
            type: 'DIRECT'
        });

        const Conversation = await conversation.findOne({
            participants: {$all:[userId, receiverUserId]}
        })

        if(Conversation){
            Conversation.messages.push(Message._id);
            await Conversation.save();
            chatUpdate.updateChatHistory(Conversation._id.toString());
        }else{
            const newConverSation = await conversation.create({
                participants: [userId, receiverUserId],
                messages: [Message._id]
            });
            chatUpdate.updateChatHistory(newConverSation._id.toString());
        }
    }catch(err){
        console.log(err);
    }
};
module.exports = directMessageHandler;