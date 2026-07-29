export const FEEDBACK_CATEGORIES = [
  "slow_response",
  "issue_unresolved",
  "communication",
  "professionalism",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export interface SubmitFeedbackInput {
  ticket_id: number;
  rating: number;
  feedback: string | null;
  categories: FeedbackCategory[];
}

export interface FeedbackRecord {
  id: number;
  ticket_id: number;
  rating: number;
  feedback: string | null;
  categories: FeedbackCategory[];
  submitted_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

/** Raw snake_case row shape as it comes back from Postgres. */
export interface FeedbackRow {
  id: number;
  ticket_id: string | number; // BIGINT can come back as string from the driver
  rating: number;
  feedback: string | null;
  categories: string[];
  submitted_at: string;
  ip_address: string | null;
  user_agent: string | null;
}
