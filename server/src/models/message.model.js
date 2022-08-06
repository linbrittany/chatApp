const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
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
    roomId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Messages", MessageSchema);