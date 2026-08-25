// src/utils/agentsExcelSync.ts
import ExcelJS from "exceljs";
import { sql } from "../config/db.js";
import { ENV } from "../config/env.js";
import { getGraphToken } from "../config/msGraph.js";

type AgentRow = {
  id: number;
  name: string;
  created_at: string | Date;
};

// Rebuilds the workbook from scratch with whatever is in Postgres right now,
// then uploads it to OneDrive as a single file. Full rewrite (not append) so
// deletes are reflected too — the sheet always mirrors the agents table
// exactly, never drifts. Returns the OneDrive webUrl for the file so callers
// can link straight to it in Excel Online.
export async function syncAgentsToExcel(): Promise<string | null> {
  try {
    const agents = (await sql`
      SELECT id, name, created_at
      FROM agents
      ORDER BY created_at DESC
    `) as AgentRow[];

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Agents");

    sheet.columns = [
      { header: "ID", key: "id", width: 8 },
      { header: "Name", key: "name", width: 30 },
      { header: "Created At", key: "created_at", width: 24 },
    ];
    sheet.getRow(1).font = { bold: true };

    for (const agent of agents) {
      sheet.addRow({
        id: agent.id,
        name: agent.name,
        created_at: new Date(agent.created_at).toLocaleString(),
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return await uploadToOneDrive(buffer);
  } catch (err) {
    // Never let a sync failure break the actual API request/response that
    // triggered it — the agent add/delete already succeeded in Postgres,
    // which is the source of truth. Just log so it can be noticed/retried.
    console.error("syncAgentsToExcel error:", err);
    return null;
  }
}

async function uploadToOneDrive(buffer: ExcelJS.Buffer): Promise<string> {
  const token = await getGraphToken();

  // PUT .../content overwrites the file in place (creating it and any
  // missing parent folders on first run). Fine for files under ~4MB, which
  // an agents list will always be. /me/drive resolves to whoever ran the
  // one-time login (scripts/msLogin.ts) — your own OneDrive.
  const url =
    `https://graph.microsoft.com/v1.0/me/drive/root:/` +
    `${ENV.MS_ONEDRIVE_FILE_PATH.replace(/^\/+/, "")}:/content`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    body: buffer as unknown as BodyInit,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OneDrive upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const driveItem = (await res.json()) as { webUrl?: string };
  return driveItem.webUrl ?? "";
}
