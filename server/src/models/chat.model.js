const mongoose = require('mongoose');

const ChatShema = new mongoose.Schema({
    users: {
        type: [String]
    }
})

module.exports = mongoose.model("Chats", ChatShema);