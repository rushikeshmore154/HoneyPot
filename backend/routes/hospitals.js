import { Router } from "express";
import {
    createHospital,
    getAllHospitals,
    getHospitalById,
    updateHospital,
    deleteHospital,
    hospitalLogin,
    updateBedAvailability,
    getRequests,
    getAppointments,
    createManyHospitals,
    getAvailablity,
    decrementBedAvailability,
    incrementBedAvailability
} from "../controllers/hospitals.js"
import authentication from "../middleware/authentication.js";
// import { getHospitalAppointments } from "../controllers/appointments.js";
import attackLogger from "../logger/attack_logger.js";
import { getHospitalById_HoneyPot, getAllHospital_HoneyPot } from "../controllers/honey_pot.js";
const router = Router();

router.post("/login", hospitalLogin);
router.get("/getall", authentication, getAllHospitals);
router.post("/create", createHospital);
router.post("/create-many", createManyHospitals);
router.get("/get", authentication, getHospitalById);
router.put("/update/:id", authentication, updateHospital);
router.delete("/delete/:id", authentication, deleteHospital);
router.patch("/update-beds/:id", authentication, updateBedAvailability);
router.get("/get-requests/:id", authentication, getRequests);
router.get("/get-availablity", authentication, getAvailablity)
router.post("/decrement-availablity", authentication, decrementBedAvailability)
router.post("/increment-availablity", authentication, incrementBedAvailability)
// Honey Pot Routes 
router.get("/", attackLogger, getAllHospital_HoneyPot);
router.get("/:hospitalId", attackLogger, getHospitalById_HoneyPot)


export default router;
