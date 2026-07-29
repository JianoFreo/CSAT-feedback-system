import type { NextFunction, Request, Response } from "express";
import { ENV } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Must be registered after all routes (4-arg signature is what tells
 * Express this is an error handler). Express 5 forwards rejected
 * promises from async handlers here automatically.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  // Unexpected error: log full detail server-side, never leak it to the client.
  // eslint-disable-next-line no-console
  console.error("[unhandled error]", err);

  res.status(500).json({
    success: false,
    error: "Internal server error",
    ...(ENV.IS_PRODUCTION
      ? {}
      : { debug: err instanceof Error ? err.message : String(err) }),
  });
}
