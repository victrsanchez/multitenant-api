import { ErrorCode } from './codes';

export class MaxNumAttemptsExceededError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = ErrorCode.MAX_NUM_ATTEMPTS_EXCEEDED;
        Error.captureStackTrace(this, this.constructor);
    }
}
