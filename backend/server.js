const express = require('express');
const http = require('http');
const cors = require('cors');
const mogoose = require('mongoose');
require('dotenv').config();

const SocketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');
const drawRouters = require('./routes/drawRoutes');
const messageRoutes = require('./routes/messageRoutes')
const PORT = process.env.PORT || process.env.API_PORT;


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);
app.use('/api/draw',drawRouters);
app.use('/api/message',messageRoutes)
const server = http.createServer(app);



mogoose.connect(process.env.MONGO_LOCAL).then(() => {
server.listen(PORT, ()=>{
    console.log(`server is running on PORT: ${PORT}`);
});
}).catch(err =>{
    console.log('fail to connect');
    console.error(err);
})
SocketServer.registerSocketServer(server);