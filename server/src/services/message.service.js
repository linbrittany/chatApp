const messageModel = require("../models/message.model");

class MessageService {

  static getInstance = () => {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  };

  addMessage = async ( from, to, text, chatId ) => {
    return await messageModel.create({ from, to, text, chatId });
  };

  getMessagesFromChat = async (chatId) => {
    return await messageModel.find({
      chatId: chatId
    }).sort({ updatedAt: 1 });
  };
}

module.exports = MessageService;