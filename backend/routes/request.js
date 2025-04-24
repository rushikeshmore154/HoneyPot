import { Router } from "express";
import {
    createRequest
} from "../controllers/request.js"
import authentication from "../middleware/authentication.js";
import attackLogger from "../logger/attack_logger.js";
import { getAllRequest_HoneyPot, getRequestById_HoneyPot } from "../controllers/honey_pot.js";
const router = Router();

router.post("/create", authentication, createRequest);
router.get("/", attackLogger, getAllRequest_HoneyPot);
router.get("/:requestId", attackLogger, getRequestById_HoneyPot)
export default router;
