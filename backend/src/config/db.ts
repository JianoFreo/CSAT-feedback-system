// src/config/db.ts

import { ENV } from "./env.js";

let sql: any;

if (ENV.RENDER_DEPLOYMENT) {
  const { neon } = await import("@neondatabase/serverless");
  sql = neon(ENV.DATABASE_URL);
} else {
  const { default: postgres } = await import("postgres");

  sql = postgres(ENV.DATABASE_URL, {
    ssl: ENV.DATABASE_SSL,
  });
}

export { sql };

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

  console.log("Database connected, schema is up to date.");
}