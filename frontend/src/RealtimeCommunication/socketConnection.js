import io from "socket.io-client";
var socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io(
    "http://localhost:1250",
    // {
    //   transports: ['websocket'],
    //   auth: {
    //     token: jwtToken,
    //   }
    // }
    );

  socket.on("connect", () => {

    console.log("succesfully connected with socket.io server");
    console.log(socket.id);

  });
  console.log(socket.connected);
  socket.on("disconnect", () => {
    console.log(socket.id);
  });
};
