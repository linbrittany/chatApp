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
    const { from, to, text, roomId } = req.body;

    try {
      if (!from || !to || !text || !roomId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeFrom = await this.userService.getUserById(from);
      const maybeTo = await this.userService.getUserById(to);
      if (!maybeFrom || !maybeTo) throw new GenericException(ERRORS.NOT_FOUND.USER);

      const maybeRoom = await this.roomService.getRoomById(roomId);
      if(!maybeRoom) throw new GenericException(ERRORS.NOT_FOUND.ROOM);

      const newMessage = await this.messageService.addMessage(from, to, text, roomId);
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
          sender: msg.from.name,
          message: msg.message,
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