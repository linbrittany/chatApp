const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const UserService = require("./user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

class AuthService {

    constructor() {
        this.accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME ?? '';
        this.jwtKey = process.env.JWT_KEY ?? '';
        this.userService = UserService.getInstance();
    }

    static getInstance = () => {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    };

    login = async (email, password) => {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new GenericException(ERRORS.NOT_FOUND.USER);

        if (!this.validatePassword(password, user.password)) throw new GenericException(ERRORS.NOT_FOUND.USER);

        const accessToken = this.signAccessToken(user._id.toString(), user.email);
        const prettyUser = this.userService.prettyUser(user);
        return {user: prettyUser, accessToken};
    }

    verifyToken = (token) => {
        try{
            const pubKey = this.jwtKey;
            return jwt.verify(token, pubKey);
        } catch(err){
            if(err.name == 'TokenExpiredError') {
                throw {status: 401, message: "Expired token."};
            } else {
                throw {status: 400, message: "Invalid token."};
            }
        }
    }

    signAccessToken = (userId, email) => {
        return this.jwtSign(userId, email, this.accessTokenExpireTime);
    }

    jwtSign = (userId, email, expiryTime) => {
        const payload = {id: userId, email: email};
        const key = this.jwtKey;
        return jwt.sign(payload, key, {issuer: 'brittu', expiresIn: expiryTime });
    }

    validatePassword = (password, hash) => {
        return bcrypt.compare(password, hash);
    }

}

module.exports = AuthService;