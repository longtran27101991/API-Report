const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgCollection: {
        type: Array
    }
}, {
    collection: 'storages'
})

module.exports = mongoose.model('Storage', userSchema)