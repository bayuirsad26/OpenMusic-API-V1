const ClientError = require('./ClientError');

// class constructor allows missing @returns tag
/**
 * Represents an Error of NotFoundError message.
 */
class NotFoundError extends ClientError {
  /**
   * @param {*} message The message of error.
   */
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
