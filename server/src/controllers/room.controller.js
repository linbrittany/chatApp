const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const RoomService = require("../services/room.service");
const UserService = require("../services/user.service");

class RoomController {
  constructor() {
    this.userService = UserService.getInstance();
    this.roomService = RoomService.getInstance();
  }

  createRoom = async (req, res, next) => {
    const { name, userId } = req.body;

    try {
      if (!name || !userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeUser = await this.userService.getUserById(userId);
      if (!maybeUser) throw new GenericException(ERRORS.NOT_FOUND.USER);

      const newRoom = await this.roomService.createRoom(name, [userId]);
      return res.status(200).send({ newRoom });
    } catch (error) {
      next(error);
    }
  };

  addUserToRoom = async (req, res, next) => {
    const { roomId, userId } = req.body;

    try {
      if (!roomId || !userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

      const maybeUser = await this.userService.getUserById(userId);
      if (!maybeUser) throw new GenericException(ERRORS.NOT_FOUND.USER);

      const maybeRoom = await this.roomService.getRoomById(roomId);
      if (!maybeRoom) throw new GenericException(ERRORS.NOT_FOUND.ROOM);

      const newUser = await this.roomService.addUserToRoom(roomId, userId);
      return res.status(200).send({ newUser });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = RoomController;