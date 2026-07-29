import { z } from "zod";
import { FEEDBACK_CATEGORIES } from "../types/feedback.types.js";

/**
 * Mirrors the rules the frontend enforces with react-hook-form + zod, but
 * this is the copy that actually matters: the frontend can be bypassed
 * (curl, browser devtools), this cannot.
 */
export const submitFeedbackSchema = z.object({
  ticket_id: z.coerce
    .number({ message: "ticket_id must be a number" })
    .int("ticket_id must be an integer")
    .positive("ticket_id must be a positive number"),

  rating: z.coerce
    .number({ message: "rating must be a number" })
    .int("rating must be an integer")
    .min(1, "rating must be between 1 and 5")
    .max(5, "rating must be between 1 and 5"),

  feedback: z
    .string()
    .trim()
    .max(2000, "feedback must be 2000 characters or fewer")
    .optional()
    .nullable()
    .transform((value) => (value && value.length > 0 ? value : null)),

  categories: z
    .array(z.enum(FEEDBACK_CATEGORIES))
    .max(FEEDBACK_CATEGORIES.length)
    .optional()
    .default([]),
});

export type SubmitFeedbackBody = z.infer<typeof submitFeedbackSchema>;
