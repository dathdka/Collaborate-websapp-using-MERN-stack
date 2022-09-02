const serverStore = require('../../serverStore');
const conversation = require ('../../models/conversation');
const updateDraw = async (conversationId) =>{
    const Conversation = await conversation.findById(conversationId).populate('draw');
      if (Conversation) {
        // var base64data = Buffer.from(JSON.stringify(Conversation.draw.at(-1)), "binary").toString("base64");
        const io = serverStore.getSocketServerInstance();
        Conversation.participants.forEach((userId) => {
          const activeConnections = serverStore.getActiveConnections(
            userId.toString()
          );
          activeConnections.forEach((socketId) => {
            io.to(socketId).emit("direct-draw-history", {
              data : Conversation.draw.at(-1)
            });
          });
        });
      }
}
module.exports = {updateDraw};