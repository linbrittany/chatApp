const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const MessageService = require("../services/message.service");
const RoomService = require("../services/room.service");
const UserService = require("../services/user.service");

class MessageController {
  constructor() {
    this.messageService = MessageService.getInstance();
    this.userService = UserService.getInstance();
    this.roomService = RoomService.getInstance();
  }

  addMessage = async (req, res, next) => {
    const { from, text, roomId } = req.body;

    try {
      if (!from || !text || !roomId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const user = await this.userService.getUserById(from.userId);
      if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);

      const maybeRoom = await this.roomService.getRoomById(roomId);
      if(!maybeRoom) throw new GenericException(ERRORS.NOT_FOUND.ROOM);

      const newMessage = await this.messageService.addMessage(from, text, roomId);
      return res.status(200).send({ newMessage });
    } catch (error) {
      next(error);
    }
  };

  getMessagesFromRoom = async (req, res, next) => {
    const roomId = req.params.roomId;

    try {
      if (!roomId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const messages = await this.messageService.getMessagesFromRoom(roomId);
      const formattedMessages = messages.map(msg => {
        return {
          name: msg.from.name,
          userId: msg.from.userId,
          message: msg.text,
          roomId: msg.roomId
        }
      })
      return res.status(200).send({ messages: formattedMessages });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MessageController;