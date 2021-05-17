import { ErrorCode } from './codes';

export class MustWaitBeforeResendError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.MUST_WAIT_BEFORE_SMS_RESEND;
        Error.captureStackTrace(this, this.constructor);
    }
}
