import { ErrorCode } from './codes';

export class IncorrectCodeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.INVALID_SMS_CODE;
    Error.captureStackTrace(this, this.constructor);
  }
}
