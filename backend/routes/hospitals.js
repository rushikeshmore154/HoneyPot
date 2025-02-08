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
    getAppointments
} from "../controllers/hospitals.js"
import authentication from "../middleware/authentication.js";
const router = Router();

router.post("/login", hospitalLogin);
router.get("/hospitals", getAllHospitals);
router.post("/hospitals", createHospital);
router.get("/hospitals/:id", authentication, getHospitalById);
router.put("/hospitals/:id", authentication, updateHospital);
router.delete("/hospitals/:id", authentication, deleteHospital);
router.patch("/hospitals/:id/beds", authentication, updateBedAvailability);
router.get("/hospitals/:id/requests", authentication, getRequests);
router.get("/hospitals/:id/appointments", authentication, getAppointments);

export default router;
