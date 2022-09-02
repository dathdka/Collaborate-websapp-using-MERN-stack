const mongoose = require('mongoose');

const schema = mongoose.Schema;

const conversationSchema = new schema({
    participants : [{
        type: schema.Types.ObjectId,
        ref: 'user'
    }],
    messages: [{
        type: schema.Types.ObjectId,
        ref: 'message'
    }],
    draw: [{
        type: schema.Types.ObjectId,
        ref: 'draw'
    }]
});

module.exports = mongoose.model('conversation', conversationSchema);