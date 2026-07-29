import { z } from "zod";
import { FEEDBACK_CATEGORIES } from "./feedback.types";

/**
 * Only the fields the customer actually fills in. ticket_id and rating are
 * NOT part of this schema/form — they come from the URL (see
 * hooks/useTicketParams) and are merged in right before the API call, so
 * there is no code path where a form field could override them.
 */
export const feedbackFormSchema = z.object({
  feedback: z
    .string()
    .max(2000, "Please keep your feedback under 2000 characters")
    .optional(),
  categories: z.array(z.enum(FEEDBACK_CATEGORIES)).optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
