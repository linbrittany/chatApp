const { ERRORS } = require("../assets/constants");
const GenericException = require("../exceptions/generic.exception.js");

exports.authMiddleware = (request, response, next) => {
    const authHeader = request.headers['x-basic-auth'];

	if (!authHeader) {
		throw new GenericException(ERRORS.FORBIDDEN.MISSING_TOKEN);
	}

	let decodedToken;

	try {
		decodedToken = getEmailAndpasswordFromHeader(authHeader);
	} catch (err) {
		response.status(err.status).send({error: err.message});
		return;
	}
	request.userBasic = decodedToken;
	next();
};

const getEmailAndpasswordFromHeader = (authHeader) => {
    const strauth = Buffer.from(authHeader, 'base64').toString();
    const splitIndex = strauth.indexOf(':');
    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);
    return {email: login, password}
}