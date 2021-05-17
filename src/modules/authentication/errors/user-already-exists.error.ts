import { ErrorCode } from './codes';

export class UserAlreadyExistsError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.USER_ALREADY_EXISTS;
    Error.captureStackTrace(this, this.constructor);
  }
}
