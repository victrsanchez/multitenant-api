import { ErrorCode } from './codes';

export class UserDoesNotExistError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.USER_NOT_FOUND;
    Error.captureStackTrace(this, this.constructor);
  }
}
