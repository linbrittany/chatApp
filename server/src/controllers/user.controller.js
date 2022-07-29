const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const UserService = require("../services/user.service")

class UserController {

  constructor() {
    this.userService = UserService.getInstance();
  }

  createUser = async (req, res, next) => {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      try {
          if (!username || !email || !password) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

          const user = await this.userService.createUser(username, email, password);
          return res.status(201).send({user});
      } catch (error) {
          next(error);
      }
  }

  getUserById = async (req, res, next) => {
    const userId = req.user.id;

    try {
        if (!userId) throw new GenericException(ERRORS.BAD_REQUEST.PARAMS);

        const user = await this.userService.getPrettyUser(userId);
        return res.status(200).send({user});
    } catch (err) {
        next(err);
    }
  }
  
}

module.exports = UserController;