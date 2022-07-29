const { authMiddleware } = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/auth.controller");
const bodyParser = require('body-parser');
const cors = require("cors");

class AuthRoutes {

    constructor() {
        this.router = require('express').Router();
        this.controller = new AuthController();
        this.init();
    }

    init = () => {
        this.router.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        this.router.use(cors());

        this.router.get('/login', authMiddleware, this.controller.login);
    }
}

module.exports = AuthRoutes;