import { ErrorCode } from './codes';

export class PasswordIsNotSetError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.PASSWORD_IS_NOT_SET;
        Error.captureStackTrace(this, this.constructor);
    }
}
