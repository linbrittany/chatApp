const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const AuthService = require("../services/auth.service");

class AuthController {

    constructor() {
        this.authService = AuthService.getInstance();
    }

    login = async (req, res, next) => {
        const email = req.userBasic.email;
        const password = req.userBasic.password;

        try {
            if (!password || !email ) {
                throw next(new GenericException(ERRORS.BAD_REQUEST.PARAMS));
            }

            const login = await this.authService.login(email.toLowerCase(), password);

            return res.status(200).send(login);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;