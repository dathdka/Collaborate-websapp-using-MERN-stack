const draw = require('../../models/draw');
const conversation = require('../../models/conversation');

const createNewBoard = async (req,res) =>{
        const userId = req.user.userId;
        const receiverId = req.body.receiverId;
        var Conversation = await conversation.findOne({
            participants: {$all:[userId, receiverId]}
        })
        var Draw = await draw.create({data : null});
        if(Conversation){
            Conversation.draw.push(Draw._id.toString());
            await Conversation.save();
        }else{
            Conversation = await conversation.create({
                participants: [userId, receiverId],
                messages: [],
                draw: [Draw._id]
            })
        }
        return res.status(201).send('new board has been create');
}

module.exports = createNewBoard;