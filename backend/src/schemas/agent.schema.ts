// src/schemas/agent.schema.ts
import { z } from "zod";

// Authoritative validation — any matching schema on the frontend is UX-only
// and can be bypassed, so never trust the client here.
export const addAgentSchema = z.object({
  name: z.string().trim().min(1, "Agent name is required").max(120),
});

export type AddAgentInput = z.infer<typeof addAgentSchema>;
