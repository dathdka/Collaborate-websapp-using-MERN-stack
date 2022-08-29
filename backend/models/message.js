const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    content: {type: String},
    date: {type: String},
    time: {type: String},
    type: {type:String},
});

module.exports = mongoose.model('message',messageSchema);