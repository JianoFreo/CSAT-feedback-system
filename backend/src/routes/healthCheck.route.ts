import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ message: "CSAT feedback API is running" });
});
router.get("test1", (_req, res) => {
  res.status(200).json({ message: "CSAT feedback API is running test1" });
});
export default router;
