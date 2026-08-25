// src/routes/agents.route.ts
import { Router } from "express";
import { getAllAgents } from "../controllers/agents/getRequests.controller.js";
import { addAgent } from "../controllers/agents/postRequests.controller.js";
import { deleteAgent } from "../controllers/agents/deleteRequest.controller.js";
import { getAgentsExcelLink } from "../controllers/agents/getExcelLink.controller.js";

const router = Router();

router.get("/", getAllAgents);
router.post("/", addAgent);
router.delete("/:id", deleteAgent);
router.get("/export/excel", getAgentsExcelLink);

export default router;
