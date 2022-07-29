const HttpException = require('./http.exception');

class GenericException extends HttpException {
    constructor(error) {
        super(error.status, error.internalStatus, error.message);
    }
}

module.exports = GenericException;
