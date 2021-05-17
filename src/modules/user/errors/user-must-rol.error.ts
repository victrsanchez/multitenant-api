import { ErrorCode } from './codes';

export class UserMustHaveRoleError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = ErrorCode.USER_MUST_ROL;
    Error.captureStackTrace(this, this.constructor);
  }
}
