const express = require('express');
const http = require('http');
const cors = require('cors');
const mogoose = require('mongoose');
require('dotenv').config();

const SocketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

const server = http.createServer(app);



mogoose.connect(process.env.MONGO_URI).then(() => {
server.listen(PORT, ()=>{
    console.log(`server is running on PORT: ${PORT}`);
});
}).catch(err =>{
    console.log('fail to connect');
    console.error(err);
})
SocketServer.registerSocketServer(server);