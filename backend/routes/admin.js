import analyzeAttackLogs from "../utils/analyzeAttackLogs.js";
import express from "express";
const router = express();

router.get("/analyze", analyzeAttackLogs);
export default router;