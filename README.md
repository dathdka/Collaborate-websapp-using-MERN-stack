<h1>A webapp with collabrate white board, video, screen share,... Using MERN Stack<h1/>

TABLE OF CONTENT:
<br/>
1. [Tech stack](#tech-stack)
2. [How to install?](#how-to-install)
3. [Primary features](#primary-features)

## Tech stack: <a name="tech-stack"></a>
 - Framework: Express.js
 - Programing language: TypeScript 
 - SQL: MongoDB 
 - Other library: Socket.io, Mongoose, JWT, CORS, webRTC,...

## How to install? <a name="how-to-install"></a>
install:
```
  npm install
```

run:
```
  npm start
```
## Primary features <a name="primary-features"></a>

- Login:

```
const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "365d",
        }
      );
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id
        },
      });
    }
    return res.status(400).send("wrong email or password, try again");
  } catch (error) {
    res.status(500).send("fail to login");
  }
};
```
- Register:

```
  const postRegister = async (req,res)=>{
    try {
        const { username, mail, password} = req.body;
        const userExists = await User.exists({mail})
        if (userExists) {
            return res.status(409).send('email already exist');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password : encryptedPassword,
            mail : mail.toLowerCase(),
            friends: []
        });

        const token = jwt.sign({
            userId: user._id,
            mail
        },
        process.env.TOKEN_KEY,{
            expiresIn : '24h'
        });

        res.status(201).json({
            userDetail: {
                mail : user.mail,
                username : user.username,
                token: token,
                password : user.password,
                _id: user._id
            },
        });
    } catch (error) {
        return res.status(500).send('error 500');
    }
};
```
- Invite:

```
const postInvite = async(req, res) =>{
    const {targetMailAddress}  = req.body;
    const {userId, mail} = req.user;
    if(mail.toLowerCase()=== targetMailAddress.toLowerCase()){
        return res.status(409).send('invalid email');
    }

    const targetUser = await user.findOne({
        mail: targetMailAddress.toLowerCase()
    })  
    if(!targetUser){
        return res.status(404).send(`${targetMailAddress} not exsist`)
    }


    const invitationAlreadyReceived = await friendInvitation.findOne({
        senderId: userId ,
        receiverId: targetUser._id,
    });
    if(invitationAlreadyReceived){
        return res.status(409).send('Already sent');
    }

    const ourFriend = targetUser.friends.find((friendId)=> 
        friendId.toString() === userId.toString());
    if(ourFriend){
        return res.status(409).send(`you are already friend with ${targetMailAddress}`)
    }
    
    const newInvitation = await friendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id
    });


    update.updateFriendsPendingInvitation(targetUser._id.toString());
    
    return res.status(201).send('invite has been sent');
}
```

- Accept/Reject invite:

```
const postAccept = async (req,res) =>{
    try{
        const {id} = req.body;
        const invitationExists = await friendInvitation.findById(id);
        if(!invitationExists){
            return res.status(401).send('something went wrong!');
        }
        const {senderId, receiverId} = invitationExists;
        const user1 = await user.findById(senderId);
        user1.friends = [...user1.friends, receiverId]; 

        const user2 = await user.findById(receiverId);
        user2.friends = [...user2.friends, senderId];

        await user1.save();
        await user2.save();

        await friendInvitation.findByIdAndDelete(id);

        updateFriends.updateFriends(senderId.toString());
        updateFriends.updateFriends(receiverId.toString());

        updateFriends.updateFriendsPendingInvitation(receiverId.toString());

        return res.status(200).send('accepted');
    }catch(error){
        return res.status(500).send('fail');
    }
}

const postReject = async (req,res) =>{
    try{
        const {id} = req.body;
        const {userId} = req.user;

        const invitationExists = await friendInvitation.exists({_id: id});
        if(invitationExists){
            await friendInvitation.findByIdAndDelete(id);
        }

        updateFriends.updateFriendsPendingInvitation(userId);

        return res.status(200).send('rejected');
    }catch(error){
        return res.status(500).send('fail');
    }
    
}
```
- Chat history:

```
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
```

- Update friend/invite list:

```
const updateFriendsPendingInvitation = async (userId) =>{
    try {
        const pendingInvitations = await friendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username mail');

        const receiverList = serverStore.getActiveConnections(userId);

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach(receiverSocketId =>{
            io.to(receiverSocketId).emit('friend-invitations',{
                pendingInvitations: pendingInvitations ? pendingInvitations : [],
            })
        })
    } catch (error) {
        console.log(error);
    }
}

const updateFriends = async (userId) =>{
    try{
        const receiverList = serverStore.getActiveConnections(userId);
        if(receiverList.length > 0){

            const User = await user.findById(userId, {_id: 1, friends: 1}).populate(
                'friends', 
                '_id username mail'
            ); 

            if(User){
                const friendList = User.friends.map(f=>{
                    return {
                        id: f._id,
                        mail: f.mail,
                        username: f.username
                    }
                });
                const io = serverStore.getSocketServerInstance();
        
                receiverList.forEach(receiverSocketId =>{
                    io.to(receiverSocketId).emit('friend-list',{
                        friends: friendList ? friendList : []
                    });
                });
            }
        }
    }catch(error){
        console.log(error);
    }
}
```
- Update room:

```
const updateRooms = (toSpecifiedTargetId = null) =>{
    const io = serverStore.getSocketServerInstance();
    const activeRooms = serverStore.getActiveRooms();
    if(toSpecifiedTargetId){
        io.to(toSpecifiedTargetId).emit('active-rooms', {
            activeRooms
        })
    }else{
        io.emit('active-rooms', {
            activeRooms
        })
    }
}
```
- Handle signal data connection (P2P):
```
const roomSignalingDataHandler = (socket, data) => {
    const { connUserSocketId, signal } = data;
  
    const signalingData = { signal, connUserSocketId: socket.id };
    socket.to(connUserSocketId).emit("conn-signal", signalingData);
};
```
<h2>And so on...</h2>
 
