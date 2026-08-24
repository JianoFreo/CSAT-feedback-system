// src/controllers/agents/getRequests.controller.ts
import type { Request, Response } from "express";
import { sql } from "../../config/db.js";

export async function getAllAgents(req: Request, res: Response) {
  try {
    const agents = await sql`
      SELECT id, name, created_at
      FROM agents
      ORDER BY created_at DESC
    `;

    res.status(200).json({ message: "Agents fetched", agents });
  } catch (err) {
    console.error("getAllAgents error:", err);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
}
