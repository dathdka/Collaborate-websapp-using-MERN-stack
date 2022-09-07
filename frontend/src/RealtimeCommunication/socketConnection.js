import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendAction";
import store from "../store/store";
import updateDirectChatHistory from "../shared/utils/chat";
import { pushData, setDraw } from "../store/actions/drawAction";
import { chatActions } from "../store/actions/chatActions";

var socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://localhost:1250", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("socket.id: " + socket.id);
    console.log("connected? :" + socket.connected);
  });

  socket.on("friend-invitations", (data) => {
    const { pendingInvitations } = data;

    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friend-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistory(data);
  });
  socket.on('direct-draw-history', (data)=>{
    const id = store.getState().draw.id;
    if(data._id.toString() === id.toString())
      store.dispatch(pushData(data));
  });
};

export const sendDirectMessage = (data) => {
  // console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const sendDataCanvas = (data) =>{
  // console.log(data)
  socket.emit("send-draw", data);
};
