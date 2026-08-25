// src/server.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ENV } from "./config/env.js";
import { connectNeon } from "./config/db.js";
import agentsRoute from "./routes/agents.route.js";
import feedbackRoute from "./routes/feedback.route.js";
import { syncAgentsToExcel } from "./utils/agentsExcelSync.js";

const app = express();

// Reflects the real client IP behind a reverse proxy (Render, etc.) instead
// of the proxy's own IP — feedback controller relies on this for req.ip.
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: ENV.FRONTEND_ORIGINS.length > 0 ? ENV.FRONTEND_ORIGINS : false,
  })
);
app.use(express.json({ limit: "10kb" }));

app.use("/api/agents", agentsRoute);
app.use("/api/feedback", feedbackRoute);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "CSAT feedback API is running" });
});

const PORT = Number(ENV.PORT);

connectNeon()
  .then(async () => {
    // Make sure the Excel mirror exists and is current as soon as the
    // server boots, not just after the next add/delete.
    await syncAgentsToExcel();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (${ENV.NODE_ENV})`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Neon Postgres:", err);
    process.exit(1);
  });
