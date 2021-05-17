import { ErrorCode } from './codes';

export class InvalidSmsTypeError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.INVALID_SMS_TYPE;
        Error.captureStackTrace(this, this.constructor);
    }
}
