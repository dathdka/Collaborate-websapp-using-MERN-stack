
const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const friendInvitationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }  
});

module.exports = mogoose.model('friendInvitation', friendInvitationSchema)