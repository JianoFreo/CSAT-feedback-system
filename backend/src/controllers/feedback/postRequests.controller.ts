import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { feedbackService } from "../../services/feedback.service.js";
import type { SubmitFeedbackBody } from "../../validators/feedback.validator.js";

/**
 * POST /api/feedback
 * Body already validated + coerced by validateBody(submitFeedbackSchema).
 */
export const submitFeedback = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as SubmitFeedbackBody;

  const record = await feedbackService.submitFeedback(body, {
    ipAddress: getClientIp(req),
    userAgent: req.get("user-agent") ?? null,
  });

  res.status(201).json({
    success: true,
    data: {
      id: record.id,
      ticket_id: record.ticket_id,
      submitted_at: record.submitted_at,
    },
  });
});

function getClientIp(req: Request): string | null {
  // req.ip respects Express's `trust proxy` setting (set in server.ts) so this
  // is correct behind a reverse proxy / load balancer, not just spoofable headers.
  return req.ip ?? null;
}
