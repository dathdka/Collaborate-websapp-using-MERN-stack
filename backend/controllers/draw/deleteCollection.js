const draw = require("../../models/draw");
const conversation = require("../../models/conversation");
const { db } = require("../../models/conversation");
const deleteCollection = async (req, res) => {
  const userId = req.user.userId;
  const receiverId = req.body.receiverId;
  const deleteId = req.body.collectionId;
  var Conversation = await conversation
    .findOne({
      participants: { $all: [userId, receiverId] },
    }).populate({
      path: 'draw',
      model: 'draw',
      select: '_id name data'
  });
    var Draw  = await draw.findById(deleteId);
  if (Conversation && Draw) {
    //TODO: delete collection (done)
    await Conversation.update(
      { $pull: { draw: Draw._id.toString() } }
    );
    
    var ConversationToSend = await conversation
    .findOne({
      participants: { $all: [userId, receiverId] },
    }).populate({
      path: 'draw',
      model: 'draw',
      select: '_id name data'
  });
    
    var Draw = await draw.findByIdAndDelete(deleteId);
    console.log(Draw._id.toString());
    return res.status(201).json({
      collection: ConversationToSend.draw,
    });
  } else {
    return res.status(402).send("something went wrong");
  }
};

module.exports = deleteCollection;
