export class UserNotFoundError extends Error {
  name: string;
  constructor() {
    super('username not found');
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class InvalidInformationError extends Error {
  name: string;
  constructor() {
    super('invalid user information');
    this.name = 'InvalidInformationError';
    Object.setPrototypeOf(this, InvalidInformationError.prototype);
  }
}

export class UserExistedError extends Error {
  name: string;
  constructor() {
    super('username existed');
    this.name = 'UserExistedError';
    Object.setPrototypeOf(this, UserExistedError.prototype);
  }
}
