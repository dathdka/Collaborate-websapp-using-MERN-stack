import io from "socket.io-client";
import {setPendingFriendsInvitations} from '../store/actions/friendAction';
import store from '../store/store';

var socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  // console.log(jwtToken);
  socket = io("http://localhost:1250", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    
    console.log("socket.id: " + socket.id);
    console.log("connected? :" + socket.connected);
  });
  
  socket.on('friend-invitations', (data) =>{
    const {pendingInvitations} = data;
    console.log(pendingInvitations);

    store.dispatch(setPendingFriendsInvitations(pendingInvitations))
  })

};
