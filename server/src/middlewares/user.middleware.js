const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");
const AuthService = require("../services/auth.service");

exports.userMiddleware = (request, response, next) => {
  const token = request.headers['x-access-token'];

  if (!token) {
    throw new GenericException(ERRORS.FORBIDDEN.MISSING_TOKEN);
  }

  let decodedToken;
  try {
    decodedToken = AuthService.getInstance().verifyToken(token);
  } catch (err) {
    response.status(err.status).send({error: err.message});
    return;
  }
  request.user = decodedToken;
  next();
};