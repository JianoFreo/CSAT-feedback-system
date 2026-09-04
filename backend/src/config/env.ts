// src/config/env.ts
import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    // Fail fast on boot rather than blowing up later on first query/request.
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const ENV = {
  PORT: process.env.PORT ?? "5000",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: required("DATABASE_URL"),
  // Comma-separated allowlist, e.g. "http://localhost:5173,https://csat-feedback-system.onrender.com"
  FRONTEND_ORIGINS: (process.env.FRONTEND_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  RATE_LIMIT_WINDOW_MS: Number(
    process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000,
  ),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX ?? 20),
  DATABASE_SSL: process.env.DATABASE_SSL === "true",
};
