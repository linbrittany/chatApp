const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Messages", MessageSchema);