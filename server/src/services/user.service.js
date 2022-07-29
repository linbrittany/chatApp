const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const userModel = require("../models/user.model");

class UserService {

    static getInstance = () => {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    };

    createUser = async (
        username,
        email, 
        password
    ) => {
        return this.prettyUser(await userModel.create({username, email, password}));
    }

    prettyUser = (user) => {
        return {
            userId: user._id,
            email: user.email,
            username: user.username
        };
    }

    getUserByEmail = async (email) => {
        return await userModel.findOne({email: email});
    }

    getPrettyUser = async (userId) => {
        const user = await this.getUserById(userId);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);
        return this.prettyUser(user);
    }

    getUserById = async (userId) => {
        return await userModel.findOne({_id: userId});
    }
}

module.exports = UserService;