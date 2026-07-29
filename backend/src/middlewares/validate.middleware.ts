import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { AppError } from "../utils/AppError.js";

/**
 * Validates+coerces req.body against `schema`, replacing req.body with the
 * parsed (and thus type-safe) result. Rejects unknown/malformed input with
 * a 422 before it ever reaches a controller.
 */
export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.issues.map((issue) => ({
          field: issue.path.join(".") || "(root)",
          message: issue.message,
        }));
        next(new AppError("Validation failed", 422, fieldErrors));
        return;
      }
      next(error);
    }
  };
}
