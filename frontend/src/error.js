export class InternalServerError extends Error {
  constructor(msg) {
    super(`internal server error: ${msg}`);
    this.name = 'InternalServerError';
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class UnknownError extends Error {
  constructor() {
    super('unknown error');
    this.name = 'UnknownError';
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

export class RequireLoginError extends Error {
  constructor() {
    super('api access require login error');
    this.name = 'RequireLoginError';
    Object.setPrototypeOf(this, RequireLoginError.prototype);
  }
}

export class InvalidPayloadError extends Error {
  constructor() {
    super('invalid payload error');
    this.name = 'InvalidPayloadError';
    Object.setPrototypeOf(this, InvalidPayloadError.prototype);
  }
}

export class IncorrectUsernameOrPasswordError extends Error {
  constructor() {
    super('incorrect username or password error');
    this.name = 'IncorrectUsernameOrPasswordError';
    Object.setPrototypeOf(this, IncorrectUsernameOrPasswordError.prototype);
  }
}

export class UsernameAlreadyExistsError extends Error {
  constructor() {
    super('username has already existed error');
    this.name = 'UsernameAlreadyExistsError';
    Object.setPrototypeOf(this, UsernameAlreadyExistsError.prototype);
  }
}

