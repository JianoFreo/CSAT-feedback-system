// src/controllers/agents/getExcelLink.controller.ts
import type { Request, Response } from "express";
import { syncAgentsToExcel } from "../../utils/agentsExcelSync.js";

// Forces a fresh sync, then either redirects the browser straight to the
// file in Excel Online, or (for API/JSON callers) returns the link as JSON.
export async function getAgentsExcelLink(req: Request, res: Response) {
  try {
    const webUrl = await syncAgentsToExcel();

    if (!webUrl) {
      res.status(502).json({ error: "Failed to sync agents to OneDrive" });
      return;
    }

    if (req.query.redirect === "false") {
      res.status(200).json({ message: "Agents synced", url: webUrl });
      return;
    }

    res.redirect(webUrl);
  } catch (err) {
    console.error("getAgentsExcelLink error:", err);
    res.status(500).json({ error: "Failed to sync agents to OneDrive" });
  }
}
