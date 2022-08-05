const bodyParser = require('body-parser');
const cors = require("cors");
const { userMiddleware } = require("../middlewares/user.middleware");
const ChatController = require("../controllers/chat.controller");

class ChatRoutes {

    constructor() {
      this.router = require('express').Router();
      this.controller = new ChatController();
      this.init();
    }

    init = () => {
        this.router.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );
        this.router.use(cors());

        this.router.post('/', userMiddleware, this.controller.createChat);
        this.router.get('/', userMiddleware, this.controller.getChatFromUsers);
    }
}

module.exports = ChatRoutes;