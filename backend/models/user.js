const mogoose = require('mongoose');
const userSchema = new mogoose.Schema({
    mail: {type: String, unique:true},
    username:{type: String},
    password:{type: String}
});

module.exports = mogoose.model('user', userSchema);