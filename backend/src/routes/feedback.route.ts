import { Router } from "express";
import { submitFeedback } from "../controllers/feedback/postRequests.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { feedbackRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import { submitFeedbackSchema } from "../validators/feedback.validator.js";

const router = Router();

router.post(
  "/",
  feedbackRateLimiter,
  validateBody(submitFeedbackSchema),
  submitFeedback
);

export default router;
