const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const AuthService = require("../services/auth.service");
const ChatService = require("../services/chat.service");

class ChatController {
  constructor() {
    this.chatService = ChatService.getInstance();
    this.authService = AuthService.getInstance();
  }

  createChat = async (req, res, next) => {
    const { users } = req.body;

    try {
      if (!from || !to) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeChat = await this.chatService.getChatFromUsers(users);
      if (maybeChat) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const newChat = await this.chatService.createChat(users);
      return res.status(201).send({ newChat });
    } catch (error) {
      next(error);
    }
  };

  getChatFromUsers = async (req, res, next) => {
    const { users } = req.body;

    try {
      if (!users) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const chat = await this.chatService.getChatFromUsers(users);
      if (!chat) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      return res.status(200).send({ chat });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ChatController;
