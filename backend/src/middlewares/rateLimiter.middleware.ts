import rateLimit from "express-rate-limit";
import { ENV } from "../config/env.js";

/**
 * This endpoint is public (linked from an email, no auth) so it's the
 * obvious target for scripted abuse. Keyed by IP; tune window/max via env.
 */
export const feedbackRateLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});
