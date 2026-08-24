// src/schemas/feedback.schema.ts
import { z } from "zod";

export const submitFeedbackSchema = z.object({
  ticket_id: z.string().trim().min(1, "ticket_id is required").max(64),
  rating: z.enum(["awesome", "just-okay", "not-good"]),
  agent_name: z.string().trim().max(120).optional(),
  comment: z.string().trim().max(2000).optional(),
});

export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
