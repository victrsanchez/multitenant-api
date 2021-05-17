import { ErrorCode } from './codes';

export class InvalidPasswordError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.INVALID_PASSWORD;
    Error.captureStackTrace(this, this.constructor);
  }
}
