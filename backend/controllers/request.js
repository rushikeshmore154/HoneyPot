import Request from "../models/Request.js";
import Hospital from "../models/Hospital.js";
import { sendAvailablity } from "../utils/sendMail.js";

export const createRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId) return res.status(401).json({ message: "Unauthorized" });
        const { hospitalId, contactInfo } = req.body;

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        const already = await Request.findOne({ userId, hospitalId });
        if (already) return res.status(400).json({ message: "Request already exists" });

        const newRequest = new Request({ userId, hospitalId, contactInfo });
        await newRequest.save();

        res.status(201).json({ message: "Request added successfully", newRequest });
    } catch (error) {
        res.status(500).json({ message: "Error adding request", error });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate("userId", "name email").populate("hospitalId", "name");
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests", error });
    }
};

export const getRequestsByHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const requests = await Request.find({ hospitalId }).populate("userId", "name email").populate("hospitalId", "name");
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hospital requests", error });
    }
};

// Delete a Request (User Cancels Request)
export const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await Request.findById(id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        await Request.findByIdAndDelete(id);
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting request", error });
    }
};

// Notify Users When a Bed is Available
export const notifyUsers = async (hospitalId) => {
    try {

        const [hospital, requests] = await Promise.all([
            Hospital.findById(hospitalId),
            Request.find({ hospitalId, status: "pending" })
        ]);

        if (!hospital) {
            return {
                message: "Hospital not found",
                success: false
            }
        }

        if (requests.length === 0) {
            return {
                message: "No pending requests",
                success: false
            }   
        }

        await Promise.all(
            requests.map(request => sendAvailablity(request.contactInfo, hospital.name))
        );

        await Request.updateMany({ hospitalId, status: "pending" }, { status: "notified" });

        return {
            message: "Users notified successfully",
            success: true
        }

    } catch (error) {
        console.error("Error notifying users:", error);
        return {
            message: "Error notifying users",
            success: false
        }
    }
};
