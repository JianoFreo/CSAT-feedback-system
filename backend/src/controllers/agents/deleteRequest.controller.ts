// src/controllers/agents/deleteRequest.controller.ts
import type { Request, Response } from "express";
import { sql } from "../../config/db.js";

export async function deleteAgent(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid agent id" });
    return;
  }

  try {
    const [deleted] = await sql`
      DELETE FROM agents
      WHERE id = ${id}
      RETURNING id
    `;

    if (!deleted) {
      res.status(404).json({ error: "Agent not found" });
      return;
    }

    res.status(200).json({ message: "Agent deleted" });
  } catch (err) {
    console.error("deleteAgent error:", err);
    res.status(500).json({ error: "Failed to delete agent" });
  }
}
