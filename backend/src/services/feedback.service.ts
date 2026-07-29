import sanitizeHtml from "sanitize-html";
import { AppError } from "../utils/AppError.js";
import {
  DuplicateFeedbackError,
  feedbackRepository,
} from "../repositories/feedback.repository.js";
import type {
  FeedbackRecord,
  FeedbackRow,
  SubmitFeedbackInput,
} from "../types/feedback.types.js";

interface SubmitFeedbackContext {
  ipAddress: string | null;
  userAgent: string | null;
}

/** Strips all HTML/script content; the textarea is free text, never markup. */
function sanitizeFeedbackText(text: string | null): string | null {
  if (!text) return null;
  const clean = sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }).trim();
  return clean.length > 0 ? clean : null;
}

function toFeedbackRecord(row: FeedbackRow): FeedbackRecord {
  return {
    id: row.id,
    ticket_id: Number(row.ticket_id),
    rating: row.rating,
    feedback: row.feedback,
    categories: row.categories as FeedbackRecord["categories"],
    submitted_at: row.submitted_at,
    ip_address: row.ip_address,
    user_agent: row.user_agent,
  };
}

export const feedbackService = {
  async submitFeedback(
    input: SubmitFeedbackInput,
    context: SubmitFeedbackContext
  ): Promise<FeedbackRecord> {
    const sanitizedInput: SubmitFeedbackInput = {
      ...input,
      feedback: sanitizeFeedbackText(input.feedback),
    };

    try {
      const row = await feedbackRepository.insert({
        ...sanitizedInput,
        ip_address: context.ipAddress,
        user_agent: context.userAgent ? context.userAgent.slice(0, 500) : null,
      });
      return toFeedbackRecord(row);
    } catch (error) {
      if (error instanceof DuplicateFeedbackError) {
        throw new AppError(error.message, 409);
      }
      throw error;
    }
  },
};
