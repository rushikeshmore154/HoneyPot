import { Router } from "express";
import hospitalRouter from "./hospitals.js"
import userRouter from "./user.js"
import requestRouter from "./request.js"
import appointmentRotuter from "./appointments.js"

const router = Router();

router.use("/hospital", hospitalRouter);
router.use("/user", userRouter);
router.use("/request", requestRouter);  
router.use("/appointment", appointmentRotuter);

export default router;