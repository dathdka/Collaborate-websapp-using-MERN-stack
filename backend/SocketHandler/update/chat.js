const conversation = require("../../models/conversation");
const serverStore = require("../../serverStore");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const Conversation = await conversation.findById(conversationId).populate({
    path: "messages",
    model: "message",
    populate: {
      path: "author",
      model: "user",
      select: "username _id",
    },
  });

  if (Conversation) {
    const io = serverStore.getSocketServerInstance();
    if (toSpecifiedSocketId) {
      io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: Conversation.messages,
        participants: Conversation.participants,
      });
    }
    Conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      );
      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: Conversation.messages,
          participants: Conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
