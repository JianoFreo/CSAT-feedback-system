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
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX ?? 20),
  // Microsoft Graph delegated (device-code) auth, used to write the
  // agents.xlsx mirror into YOUR OWN OneDrive. No client secret and no
  // admin consent needed — see scripts/msLogin.ts for the one-time setup.
  MS_TENANT_ID: process.env.MS_TENANT_ID ?? "common",
  MS_CLIENT_ID: required("MS_CLIENT_ID"),
  // Path inside your OneDrive root.
  MS_ONEDRIVE_FILE_PATH: process.env.MS_ONEDRIVE_FILE_PATH ?? "CSAT/agents.xlsx",
  // Where the token cache (from the one-time login) is stored on disk.
  MS_TOKEN_CACHE_PATH: process.env.MS_TOKEN_CACHE_PATH ?? "./.ms-token-cache.json",
};
