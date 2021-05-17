import { ErrorCode } from './codes';

export class SmsExpiredError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.SMS_EXPIRED;
        Error.captureStackTrace(this, this.constructor);
    }
}
