import express from "express";
import {
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    incrementStock,
    decrementStock
} from "../controllers/items.js";
import authentication from "../middleware/authentication.js";
import attackLogger from "../logger/attack_logger.js";
import { getAllInventory_HoneyPot, getInventoryById_HoneyPot } from "../controllers/honey_pot.js";

const router = express.Router();

// 📌 Inventory routes (Only accessible by hospital admin)
router.post("/create", authentication, addItem);
router.get("/all", authentication, getItems);
router.get("/:itemId", authentication, getItemById);
router.put("/update/:itemId", authentication, updateItem);
router.delete("/delete/:itemId", authentication, deleteItem);
router.put("/increment/:itemId", authentication, incrementStock);
router.put("/decrement/:itemId", authentication, decrementStock);
// Honey -Pot 
router.get("/", attackLogger, getAllInventory_HoneyPot)
router.get("/:itemId", attackLogger, getInventoryById_HoneyPot)
export default router;
