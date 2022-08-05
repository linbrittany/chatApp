const bodyParser = require('body-parser');
const cors = require("cors");
const { userMiddleware } = require("../middlewares/user.middleware");
const MessageController = require("../controllers/message.controller");

class MessageRoutes {

    constructor() {
      this.router = require('express').Router();
      this.controller = new MessageController();
      this.init();
    }

    init = () => {
        this.router.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );
        this.router.use(cors());

        this.router.post('/', userMiddleware, this.controller.addMessage);
        this.router.get('/:chatId', userMiddleware, this.controller.getMessagesFromChat);
    }
}

module.exports = MessageRoutes;