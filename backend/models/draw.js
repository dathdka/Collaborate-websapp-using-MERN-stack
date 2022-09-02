const mongoose = require('mongoose');

const schema = mongoose.Schema;

const drawSchema = new schema({
    data: {type : String}
})

module.exports = mongoose.model('draw', drawSchema);