import { Router } from "express";
import hospitalRouter from "./hospitals.js"

const router = Router();

router.use("/hospital", hospitalRouter);

export default router;