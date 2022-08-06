const roomModel = require("../models/room.model");

class RoomService {
  static getInstance = () => {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }
    return RoomService.instance;
  };

  createRoom = async (name, users) => {
    return await roomModel.create({
      name: name,
      users: users,
    });
  };

  getRoomsFromUser = async (userId) => {
    return await roomModel.find({ users: userId });
  }

  getRoomsAvailable = async (userId) => {
    return await roomModel.find({ users: {$ne: userId} });
  }

  prettyRoom = (room) => {
    return {
      roomId: room._id,
      name: room.name
    }
  }

  addUserToRoom = async (roomId, userId) => {
    return await roomModel.findOneAndUpdate(
      { _id: roomId },
      {
        $push: {
          users: userId,
        },
      }
    );
  };

  getRoomById = async (roomId) => {
    return await roomModel.findOne({ _id: roomId });
  }
}

module.exports = RoomService;
