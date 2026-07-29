import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";

/**
 * Tagged-template SQL client. Always use this as `sql\`... ${param} ...\``
 * so every value is sent as a parameter to Postgres, never string-concatenated.
 * Never build queries with template literals that interpolate raw strings.
 */
export const sql = neon(ENV.DATABASE_URL);

/**
 * `feedback` is the single source of truth for the schema in this project
 * (no migration framework). Run on server boot; CREATE TABLE/INDEX are
 * idempotent so this is safe to run on every deploy.
 */
export async function connectNeon(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id            SERIAL PRIMARY KEY,
      ticket_id     BIGINT NOT NULL,
      rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      feedback      TEXT,
      categories    TEXT[] NOT NULL DEFAULT '{}',
      submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      ip_address    VARCHAR(45),
      user_agent    TEXT,
      CONSTRAINT feedback_ticket_id_unique UNIQUE (ticket_id)
    )
  `;

  // Lookups by ticket (dedupe checks, support-agent drilldowns).
  await sql`
    CREATE INDEX IF NOT EXISTS idx_feedback_ticket_id ON feedback (ticket_id)
  `;

  // Dashboards/reporting typically query "recent feedback" and "feedback by rating".
  await sql`
    CREATE INDEX IF NOT EXISTS idx_feedback_submitted_at ON feedback (submitted_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback (rating)
  `;

  // eslint-disable-next-line no-console
  console.log("[db] Connected to Neon Postgres, schema verified.");
}
