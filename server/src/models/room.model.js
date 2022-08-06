const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: {
      type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model("Rooms", RoomSchema);