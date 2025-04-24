import { Router } from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    changeUserPassword
} from "../controllers/user.js";
import authentication from "../middleware/authentication.js";
import { getAllUser_HoneyPot, getUserById_HoneyPot } from "../controllers/honey_pot.js";
import attackLogger from "../logger/attack_logger.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", authentication, getUserProfile);
router.put("/update/:id", authentication, updateUserProfile);
router.delete("/delete/:id", authentication, deleteUser);
router.patch("/change-password", authentication, changeUserPassword);
// Honey-Pot
router.get("/", attackLogger, getAllUser_HoneyPot)
router.get("/:userId", attackLogger, getUserById_HoneyPot)

export default router;
