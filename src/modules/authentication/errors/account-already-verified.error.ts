import { ErrorCode } from './codes';

export class AccountAlreadyVerifiedError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.ACCOUNT_ALREADY_VERIFIED;
        Error.captureStackTrace(this, this.constructor);
    }
}
