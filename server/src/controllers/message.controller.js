const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const MessageService = require("../services/message.service");
const ChatService = require("../services/chat.service");

class MessageController {
  constructor() {
    this.messageService = MessageService.getInstance();
    this.chatService = ChatService.getInstance();
  }

  addMessage = async (req, res, next) => {
    const { from, to, text, chatId } = req.body;

    try {
      if (!from || !to || !text || !chatId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeChat = await this.chatService.getChatById(chatId);
      if (!maybeChat) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const newMessage = await this.messageService.addMessage(from, to, text, chatId);
      return res.status(200).send({ newMessage });
    } catch (error) {
      next(error);
    }
  };

  getMessagesFromChat = async (req, res, next) => {
    const { chatId } = req.body;

    try {
      if (!chatId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeChat = await this.chatService.getChatById(chatId);
      if (!maybeChat) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const messages = await this.messageService.getMessagesFromChat(chatId);
      return res.status(200).send({ messages });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MessageController;