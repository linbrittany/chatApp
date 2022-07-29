const UserController = require("../controllers/user.controller");
const bodyParser = require('body-parser');
const cors = require("cors");
const { userMiddleware } = require("../middlewares/user.middleware");

class UserRoutes {

    constructor() {
      this.router = require('express').Router();
      this.controller = new UserController();
      this.init();
    }

    init = () => {

        this.router.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );
        this.router.use(cors());

        this.router.post('/', this.controller.createUser);
        this.router.get('/:userId', userMiddleware, this.controller.getUserById);
    }
}

module.exports = UserRoutes;