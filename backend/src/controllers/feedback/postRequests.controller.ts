// src/controllers/feedback/postRequests.controller.ts
import type { Request, Response } from "express";
import { sql } from "../../config/db.js";
import { submitFeedbackSchema } from "../../schemas/feedback.schema.js";
import { stripHtml } from "../../utils/sanitize.js";

export async function submitFeedback(req: Request, res: Response) {
  const parsed = submitFeedbackSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { ticket_id, rating, agent_name, comment } = parsed.data;
  const cleanComment = comment ? stripHtml(comment) : null;
  // req.trust proxy" is set in server.ts so this reflects the real client,
  // not whatever reverse proxy sits in front of the app.
  const ip = req.ip ?? null;

  try {
    const [entry] = await sql`
      INSERT INTO feedback (ticket_id, agent_name, rating, comment, ip_address)
      VALUES (${ticket_id}, ${agent_name ?? null}, ${rating}, ${cleanComment}, ${ip})
      RETURNING id, ticket_id, agent_name, rating, created_at
    `;

    res.status(201).json({ message: "Feedback submitted", feedback: entry });
  } catch (err: any) {
    // UNIQUE (ticket_id) — a ticket has already been rated.
    if (err?.code === "23505") {
      res.status(409).json({ error: "Feedback for this ticket was already submitted" });
      return;
    }

    console.error("submitFeedback error:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
}
