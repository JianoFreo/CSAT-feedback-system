// src/routes/feedback.route.ts
import { Router } from "express";
import { submitFeedback } from "../controllers/feedback/postRequests.controller.js";
import { feedbackRateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post("/", feedbackRateLimiter, submitFeedback);

export default router;
