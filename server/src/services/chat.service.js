const chatModel = require("../models/chat.model");

class ChatService {
  static getInstance = () => {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  };

  creteChat = async (users) => {
    return await chatModel.create({ users: users });
  };

  getChatFromUsers = async (users) => {
    return await chatModel.find({
      users: {
        $all: users,
      },
    });
  };
}

module.exports = ChatService;