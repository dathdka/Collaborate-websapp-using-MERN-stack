const draw = require('../../models/draw');
const conversation = require('../../models/conversation');

const getCollection = async (req, res) =>{
    const userId = req.user.userId;
    console.log(userId);
    const receiverId = req.body.receiverId;
    console.log(receiverId);
    const Conversation = await conversation.findOne({
        participants: {$all:[userId,receiverId]}
    }).populate({
        path: 'draw',
        model: 'draw',
        select: '_id name data'
    });
    // console.log(Conversation);
    if(Conversation){
        return res.status(200).json({
            collection: Conversation.draw
        })
    }
    return res.status(200).json({
        collection: null
    })
}

module.exports = getCollection;