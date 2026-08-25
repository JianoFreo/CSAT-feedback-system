// src/controllers/agents/postRequests.controller.ts
import type { Request, Response } from "express";
import { sql } from "../../config/db.js";
import { addAgentSchema } from "../../schemas/agent.schema.js";
import { syncAgentsToExcel } from "../../utils/agentsExcelSync.js";

export async function addAgent(req: Request, res: Response) {
  const parsed = addAgentSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  try {
    const [agent] = await sql`
      INSERT INTO agents (name)
      VALUES (${parsed.data.name})
      RETURNING id, name, created_at
    `;

    res.status(201).json({ message: "Agent added", agent });

    // Fire-and-forget: refresh the Excel mirror after responding, so the
    // sync never adds latency to (or risk of failing) the actual request.
    void syncAgentsToExcel();
  } catch (err) {
    console.error("addAgent error:", err);
    res.status(500).json({ error: "Failed to add agent" });
  }
}
