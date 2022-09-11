const draw = require('../../models/draw');
const conversation = require('../../models/conversation');
const deleteCollection = async (req, res) =>{
    const userId = req.user.userId;
    const receiverId = req.body.receiverId;
    const deleteId = req.body.collectionId;
    var Conversation = await conversation.findOne({
        participants: {$all:[userId,receiverId]}
    });
    if(Conversation){
        //TODO: delete collection
    }else{
        return res.status(401).send('something went wrong')
    }
}

module.exports = deleteCollection;