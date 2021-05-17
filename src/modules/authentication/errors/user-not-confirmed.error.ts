import { ErrorCode } from './codes';

export class UserNotConfirmedError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.USER_NOT_CONFIRMED;
    Error.captureStackTrace(this, this.constructor);
  }
}
