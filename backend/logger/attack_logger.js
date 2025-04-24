// import AttackLog from "../models/AttackLog.js";

import AttackLog from "../models/Attacklog.js";

const attackLogger = async (req, res, next) => {

    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const method = req.method;
        const endpoint = req.originalUrl;
        const payload = method === "GET" ? req.query : req.body;

        const newLog = new AttackLog({
            ip,
            userAgent,
            method,
            endpoint,
            payload,
            attackType: "Reconnaissance" // optional, you can randomize if you want
        });

        await newLog.save();
        console.log("API CALLED BY ", ip)
    } catch (error) {
        console.error("Failed to save attack log:", error);
    }

    next();
};

export default attackLogger;
