const bodyParser = require('body-parser');
const cors = require("cors");
const { userMiddleware } = require("../middlewares/user.middleware");
const RoomController = require("../controllers/room.controller");

class RoomRoutes {

    constructor() {
      this.router = require('express').Router();
      this.controller = new RoomController();
      this.init();
    }

    init = () => {
        this.router.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );
        this.router.use(cors());

        this.router.post('/', userMiddleware, this.controller.createRoom);
        this.router.post('/new-user/', userMiddleware, this.controller.addUserToRoom);
    }
}

module.exports = RoomRoutes;