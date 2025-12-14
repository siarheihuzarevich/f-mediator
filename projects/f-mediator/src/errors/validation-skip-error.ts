export class ValidationSkipError extends Error {
  constructor(message: string = 'Validation conditions not met, skipping execution') {
    super(message);
    this.name = 'ValidationSkipError';
    Object.setPrototypeOf(this, ValidationSkipError.prototype);
  }
}
