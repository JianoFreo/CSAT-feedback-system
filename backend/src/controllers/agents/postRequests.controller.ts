// src/controllers/agents/postRequests.controller.ts
import type { Request, Response } from "express";
import { sql } from "../../config/db.js";
import { addAgentSchema } from "../../schemas/agent.schema.js";

export async function addAgent(req: Request, res: Response) {
  const parsed = addAgentSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  try {
    const [agent] = await sql`
      INSERT INTO agents (name, role)
      VALUES (${parsed.data.name}, ${parsed.data.role})
      RETURNING id, name, role, created_at
    `;

    res.status(201).json({ message: "Agent added", agent });
  } catch (err) {
    console.error("addAgent error:", err);
    res.status(500).json({ error: "Failed to add agent" });
  }
}