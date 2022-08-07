const messageModel = require("../models/message.model");

class MessageService {

  static getInstance = () => {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  };

  addMessage = async ( from, text, roomId ) => {
    return await messageModel.create({ from, text, roomId });
  };

  getMessagesFromRoom = async (roomId) => {
    return await messageModel.find({
      roomId: roomId
    }).sort({ updatedAt: 1 });
  };
}

module.exports = MessageService;