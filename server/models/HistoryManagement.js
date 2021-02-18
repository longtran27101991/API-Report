const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    upload_id: { type: String},
    user_id: {type: String},
    edit_time: {type: Date}
});

HistoryManagement = mongoose.model('history_results', HistorySchema);
module.exports = HistoryManagement;

