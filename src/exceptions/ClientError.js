// class constructor allows missing @returns tag
/**
 * Represents an Error of ClientError message.
 */
class ClientError extends Error {
  /**
   * @param {*} message The message of error.
   * @param {*} statusCode The status code of error.
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
