const mongoose = require('mongoose');

const schema = mongoose.Schema;

const drawSchema = new schema({
    data: {type : String},
    name: {type : Date}
})

module.exports = mongoose.model('draw', drawSchema);