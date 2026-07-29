/**
 * Represents a known, expected failure (bad input, duplicate submission, etc.)
 * as opposed to an unexpected bug. The error handler middleware uses
 * `isOperational` to decide whether to trust `message` for the client
 * response or fall back to a generic message.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
