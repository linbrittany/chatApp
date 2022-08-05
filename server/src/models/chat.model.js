const mongoose = require('mongoose');

const ChatShema = new mongoose.Schema({
    users: [String]
})

module.exports = mongoose.model("Chats", ChatShema);