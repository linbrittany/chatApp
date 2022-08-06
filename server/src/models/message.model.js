const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    to: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
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