/** Must stay in sync with backend/src/types/feedback.types.ts FEEDBACK_CATEGORIES. */
export const FEEDBACK_CATEGORIES = [
  "slow_response",
  "issue_unresolved",
  "communication",
  "professionalism",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  slow_response: "Slow response",
  issue_unresolved: "Issue unresolved",
  communication: "Communication",
  professionalism: "Professionalism",
  other: "Other",
};

/** 1-5 rating scale driven from the Freshdesk email emoji links. */
export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface RatingMeta {
  value: RatingValue;
  emoji: string;
  label: string;
}

export const RATING_SCALE: readonly RatingMeta[] = [
  { value: 1, emoji: "😡", label: "Very unsatisfied" },
  { value: 2, emoji: "🙁", label: "Unsatisfied" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Satisfied" },
  { value: 5, emoji: "😄", label: "Very satisfied" },
];

/** Parsed + validated data from the URL query string. */
export interface TicketParams {
  ticketId: number;
  rating: RatingValue;
  subject: string | null;
}

/** Body sent to POST /api/feedback. */
export interface SubmitFeedbackPayload {
  ticket_id: number;
  rating: RatingValue;
  feedback: string | null;
  categories: FeedbackCategory[];
}

export interface SubmitFeedbackResponseData {
  id: number;
  ticket_id: number;
  submitted_at: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Array<{ field: string; message: string }>;
}
