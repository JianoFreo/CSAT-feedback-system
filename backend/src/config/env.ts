import dotenv from "dotenv";

dotenv.config();

/**
 * Fails fast on boot if a required env var is missing, instead of
 * surfacing a confusing runtime error later (e.g. on the first DB query).
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 5000),
  DATABASE_URL: required("DATABASE_URL"),
  FRONTEND_ORIGINS: (process.env.FRONTEND_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 20),
  IS_PRODUCTION: (process.env.NODE_ENV ?? "development") === "production",
};
