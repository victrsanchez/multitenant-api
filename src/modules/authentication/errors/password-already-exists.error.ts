import { ErrorCode } from './codes';

export class ExistingPasswordError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.PASSWORD_ALREADY_SET;
    Error.captureStackTrace(this, this.constructor);
  }
}
