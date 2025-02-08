import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const createHospital = async (req, res) => {
    try {
        const { name, address, contactNumber, email, password, totalBeds } = req.body;
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) return res.status(400).json({ message: "Hospital already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const hospital = new Hospital({
            name,
            address,
            contactNumber,
            email,
            password: hashedPassword,
            totalBeds,
            occupiedBeds: 0,
            availableBeds: totalBeds,
            subAdmins: [],
        });

        await hospital.save();
        res.status(201).json({ message: "Hospital created successfully", hospital });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find().select("-password").select("-subAdmins").select("-requests").select("-appointments");
        res.status(200).json(hospitals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getHospitalById = async (req, res) => {
    try {
        let hospital = {};
        if (req.user.role === "hospital") {
            hospital = await Hospital.findById(req.user.id).select("-password").populate("requests").populate("appointments").populate("subAdmins");
        } else if (req.user.role === "subAdmin") {
            hospital = await Hospital.findById(req.params.id).select("-password").populate("requests")
        } else {
            hospital = await Hospital.findById(req.params.id).select("-password").select("-subAdmins").select("-requests").select("-appointments");
        }
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });
        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateHospital = async (req, res) => {
    try {
        if (req.user.role != "hospital") return res.status(401).json({ message: "Unauthorized" });
        const { name, address, contactNumber, totalBeds } = req.body;
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        hospital.name = name || hospital.name;
        hospital.address = address || hospital.address;
        hospital.contactNumber = contactNumber || hospital.contactNumber;
        hospital.totalBeds = totalBeds || hospital.totalBeds;

        await hospital.save();
        res.status(200).json({ message: "Hospital updated successfully", hospital });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteHospital = async (req, res) => {
    try {
        if (req.user.role != "hospital") return res.status(401).json({ message: "Unauthorized" });
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });
        res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const hospitalLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hospital = await Hospital.findOne({ email });
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: hospital._id, role: "hospital" }, SECRET_KEY, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token, hospitalId: hospital._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateBedAvailability = async (req, res) => {
    try {
        if (req.user.role != "hospital" && req.user.role != "subAdmin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { occupiedBeds } = req.body;
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        if (occupiedBeds > hospital.totalBeds)
            return res.status(400).json({ message: "Occupied beds cannot exceed total beds" });

        hospital.occupiedBeds = occupiedBeds;
        hospital.availableBeds = hospital.totalBeds - occupiedBeds;

        await hospital.save();
        res.status(200).json({ message: "Bed availability updated", hospital });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getRequests = async (req, res) => {
    try {
        if (req.user.role != "hospital"
            && req.user.role != "subAdmin"
        ) return res.status(401).json({ message: "Unauthorized" });
        const hospital = await Hospital.findById(req.params.id).populate("requests");
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        res.status(200).json(hospital.requests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAppointments = async (req, res) => {
    try {
        if (req.user.role != "hospital"
        ) return res.status(401).json({ message: "Unauthorized" });
        const hospital = await Hospital.findById(req.params.id).populate("appointments");
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        res.status(200).json(hospital.appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
