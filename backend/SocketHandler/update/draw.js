const serverStore = require('../../serverStore');
const conversation = require ('../../models/conversation');
const { where } = require('../../models/draw');
const updateDraw = async (conversationId, canvasId, canvasData) =>{
    const Conversation = await conversation.findById(conversationId).populate({
      path : 'draw',
      model: 'draw',
      select: 'data',
    });
      if (Conversation) {
        // var base64data = Buffer.from(JSON.stringify(Conversation.draw.at(-1)), "binary").toString("base64");
        const io = serverStore.getSocketServerInstance();
        Conversation.participants.forEach((userId) => {
          const activeConnections = serverStore.getActiveConnections(
            userId.toString()
          );
          activeConnections.forEach((socketId) => {
            io.to(socketId).emit("direct-draw-history", {
              // problem
              _id: canvasId,
              data : canvasData
            });
          });
        });
      }
}
module.exports = {updateDraw};