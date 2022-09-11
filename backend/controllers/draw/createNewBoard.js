const draw = require('../../models/draw');
const conversation = require('../../models/conversation');
const BLANK_BOARD = require('./BLANK_BOARD');
const board = require('./BOARD');
const createNewBoard = async (req,res) =>{
        const userId = req.user.userId;
        const receiverId = req.body.receiverId;
        var Conversation = await conversation.findOne({
            participants: {$all:[userId, receiverId]}
        })
        var dat = new Date();
        var Draw = await draw.create({
            data : JSON.stringify(board), 
            name : `${dat.getDate()}-${dat.getMonth() + 1}-${dat.getFullYear()} ${dat.getHours()}:${dat.getMinutes()}`,
        });
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
        return res.status(201).json({
            id: Draw._id,
            data: JSON.parse(Draw.data)
        });
}

module.exports = createNewBoard;