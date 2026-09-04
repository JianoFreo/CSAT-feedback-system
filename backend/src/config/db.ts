// src/config/db.ts
import postgres from "postgres";
import { ENV } from "./env.js";

export const sql = postgres(ENV.DATABASE_URL, {
  ssl: ENV.DATABASE_SSL, // self-hosted Postgres has no TLS by default
});

// Tagged-template sql client. Every query in this codebase goes through this
// (interpolated ${} params, never string concatenation) to avoid SQL injection.


// This file is the single source of truth for the schema — there are no
// migration files. Run connectNeon() once on server boot; CREATE TABLE IF
// NOT EXISTS makes it safe to run against an already-provisioned database.
export async function connectNeon() {
  await sql`
    CREATE TABLE IF NOT EXISTS agents (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      ticket_id TEXT NOT NULL UNIQUE,
      agent_name TEXT,
      rating TEXT NOT NULL CHECK (rating IN ('awesome', 'just-okay', 'not-good')),
      comment TEXT,
      ip_address TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Connected to Neon Postgres, schema is up to date.");
}
