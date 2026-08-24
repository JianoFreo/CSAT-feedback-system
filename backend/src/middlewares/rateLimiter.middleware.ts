// src/middlewares/rateLimiter.middleware.ts
import rateLimit from "express-rate-limit";
import { ENV } from "../config/env.js";

// Guards POST /api/feedback against spam / scripted abuse. Window and max
// are tunable via RATE_LIMIT_WINDOW_MS / RATE_LIMIT_MAX so this doesn't need
// a code change to retune in prod.
export const feedbackRateLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions, please try again later." },
});
