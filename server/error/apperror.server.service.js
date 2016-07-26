'use strict';

const HTTPStatus = require('http-status');
const ExtendableError = require('./extendableerror.server.service');

/*
 Usage example in express: next(new ErrorHandler(ErrorHandler.getERROR_CODES().OTHER,'Could not get result',err));
 */

var defaultErrorMessage = 'Something went wrong!';

class AppError extends ExtendableError {

    constructor(message, errorCode, causedBy) {
        super(`${message || defaultErrorMessage} \n Caused By: ${causedBy || causedBy.stack}`);
        this.status = errorCode || errorCode.httpCode || AppError.ERROR_CODES.OTHER.httpCode;
    }

    static get ERROR_CODES() {
        return {
            INVALID : {httpCode: HTTPStatus.BAD_REQUEST, code:"INVALID_REQUEST_PARAMS"},
            OTHER : {httpCode: HTTPStatus.INTERNAL_SERVER_ERROR, code: "OTHER_ERROR"}
        };
    }
}

module.exports = AppError;