import io from "socket.io-client";
var socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.userDetails.token;
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
  
};
