const draw = require("../models/draw");
const conversation = require("../models/conversation");
const {updateDraw} = require('./update/draw');
const directDrawHistory = async (socket, data) => {
  try {
    var { userId } = socket.user;

    //decode base64 to binary
    // var binary = Buffer.from(JSON.stringify( data.image), "base64");
    var receiverId = data.receiverId;

    var Conversation = await conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    var Draw = await draw.findById(Conversation.draw.at(-1));

    Draw.data = data.image;
    await Draw.save();

    updateDraw(Conversation._id.toString())


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
