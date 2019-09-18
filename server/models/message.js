const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sendername: {
        type: String,
        required: true
    },
    senderstate: {
        type: String,
        required: true
    },
    created_at : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);