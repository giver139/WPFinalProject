export class InvalidSourceSelectionError extends Error {
  name: string;
  constructor() {
    super('invalid soucre selection');
    this.name = 'InvalidSourceSelectionError';
    Object.setPrototypeOf(this, InvalidSourceSelectionError.prototype);
  }
}

export class NoPossibleDestinationError extends Error {
  name: string;
  constructor() {
    super('no possible destination for selected position');
    this.name = 'NoPossibleDestinationError';
    Object.setPrototypeOf(this, NoPossibleDestinationError.prototype);
  }
}

export class InvalidDestinationSelectionError extends Error {
  name: string;
  constructor() {
    super('invalid destination selection');
    this.name = 'InvalidDestinationSelectionError';
    Object.setPrototypeOf(this, InvalidDestinationSelectionError.prototype);
  }
}

