import io from "socket.io-client";
var socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.userDetails.token;
  console.log(jwtToken);
  socket = io(
    "http://localhost:1250",
    {
      auth: {
        token: jwtToken,
      }
    }
    );

  socket.on("connect", () => {

    console.log("succesfully connected with socket.io server");
    console.log(socket.id + 'connect');

  });
  console.log(socket.connected + ' check');
  socket.on("disconnect", () => {
    console.log(socket.id + 'disconect');
  });
};
