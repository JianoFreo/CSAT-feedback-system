import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env.js";
import { connectNeon } from "./config/db.js";
import feedbackRouter from "./routes/feedback.route.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

// Behind Render/Railway/Vercel/etc. there's a reverse proxy in front of us;
// this makes req.ip resolve the real client IP from X-Forwarded-For instead
// of the proxy's IP, and is required for express-rate-limit to key per-user.
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: ENV.FRONTEND_ORIGINS,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "10kb" })); // feedback text is capped at 2000 chars; 10kb is generous headroom
app.use(morgan(ENV.IS_PRODUCTION ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.use("/api/feedback", feedbackRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function start(): Promise<void> {
  await connectNeon();
  app.listen(ENV.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] Feedback API listening on port ${ENV.PORT} (${ENV.NODE_ENV})`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("[server] Failed to start:", error);
  process.exit(1);
});
