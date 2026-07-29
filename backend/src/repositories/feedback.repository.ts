import { sql } from "../config/db.js";
import type {
  FeedbackCategory,
  FeedbackRow,
  SubmitFeedbackInput,
} from "../types/feedback.types.js";

/** Postgres unique_violation error code. */
const PG_UNIQUE_VIOLATION = "23505";

export class DuplicateFeedbackError extends Error {
  constructor(ticketId: number) {
    super(`Feedback for ticket ${ticketId} has already been submitted`);
    this.name = "DuplicateFeedbackError";
  }
}

/**
 * All queries use the `sql` tagged template with interpolated `${}`
 * parameters — never string concatenation — so Postgres always treats
 * user input as data, not SQL.
 */
export const feedbackRepository = {
  async insert(
    input: SubmitFeedbackInput & { ip_address: string | null; user_agent: string | null }
  ): Promise<FeedbackRow> {
    try {
      const rows = (await sql`
        INSERT INTO feedback (ticket_id, rating, feedback, categories, ip_address, user_agent)
        VALUES (
          ${input.ticket_id},
          ${input.rating},
          ${input.feedback},
          ${input.categories},
          ${input.ip_address},
          ${input.user_agent}
        )
        RETURNING id, ticket_id, rating, feedback, categories, submitted_at, ip_address, user_agent
      `) as FeedbackRow[];

      const row = rows[0];
      if (!row) {
        throw new Error("Insert returned no row");
      }
      return row;
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new DuplicateFeedbackError(input.ticket_id);
      }
      throw error;
    }
  },

  async findByTicketId(ticketId: number): Promise<FeedbackRow | null> {
    const rows = (await sql`
      SELECT id, ticket_id, rating, feedback, categories, submitted_at, ip_address, user_agent
      FROM feedback
      WHERE ticket_id = ${ticketId}
      LIMIT 1
    `) as FeedbackRow[];
    return rows[0] ?? null;
  },
};

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === PG_UNIQUE_VIOLATION
  );
}

// Re-exported for callers that need the category type without importing types/ directly.
export type { FeedbackCategory };
