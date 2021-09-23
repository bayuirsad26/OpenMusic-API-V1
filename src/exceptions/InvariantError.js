const ClientError = require('./ClientError');

// class constructor allows missing @returns tag
/**
 * Represents an Error of InvariantError message.
 */
class InvariantError extends ClientError {
  /**
   * @param {*} message The message of error.
   */
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
