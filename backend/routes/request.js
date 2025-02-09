import { Router } from "express";
import {
    createRequest
} from "../controllers/request.js"
import authentication from "../middleware/authentication.js";
const router = Router();

router.post("/create", authentication, createRequest);

export default router;
