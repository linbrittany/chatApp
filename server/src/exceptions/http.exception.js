class HttpException extends Error {

    constructor(status, internalStatus, message) {
        super(message);
        this.status = status;
        this.internalStatus = internalStatus;
        this.message = message;
    }
}

module.exports = HttpException