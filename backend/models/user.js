const mogoose = require('mongoose');
const Schema = mogoose.Schema;

const userSchema = new mogoose.Schema({
    mail: {type: String, unique:true},
    username:{type: String},
    password:{type: String},
    friends: [{type: Schema.Types.Object, ref: 'user'}]
});

module.exports = mogoose.model('user', userSchema);