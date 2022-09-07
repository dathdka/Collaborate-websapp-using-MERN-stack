const draw = require("../models/draw");
const conversation = require("../models/conversation");
const {updateDraw} = require('./update/draw');
const directDrawHistory = async (socket, data) => {
  try {
    var { userId } = socket.user;

    //decode base64 to binary
    var receiverId = data.receiverId;
    var canvasId = data.canvasId;

    var Conversation = await conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    var Draw = await draw.findById(canvasId);
    if(Draw){
      var getData = JSON.parse(Draw.data);
      getData.objects.push(data.image);
      Draw.data = JSON.stringify(getData);
      await Draw.save();
      updateDraw(Conversation._id.toString(), canvasId, data.image)
    }


    // var check = await

    // Conversation.draw.push(Conversation._id.toString());
    // await Conversation.save();
    //encode binary to base64
    // var base64data = Buffer.from(binary, "binary").toString("base64");
  } catch (err) {
    console.log(err);
  }
};

module.exports = directDrawHistory;
