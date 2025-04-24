import AttackLog from "../models/Attacklog.js";

const analyzeAttackLogs = async (req, res) => {
    try {
        // HTTP Methods
        const methodAnalysis = await AttackLog.aggregate([
            { $group: { _id: "$method", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // API Endpoints
        const endpointAnalysis = await AttackLog.aggregate([
            { $group: { _id: "$endpoint", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Attack Types
        const attackTypeAnalysis = await AttackLog.aggregate([
            { $group: { _id: "$attackType", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Location Analysis
        const locationAnalysis = await AttackLog.aggregate([
            { $match: { "location.country": { $ne: null } } },
            { $group: { _id: "$location.country", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Time Series (per day)
        const timeSeries = await AttackLog.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        // Hourly Analysis
        const hourlyAnalysis = await AttackLog.aggregate([
            { $group: { _id: { $hour: "$timestamp" }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        // Top IP Addresses
        const topIPs = await AttackLog.aggregate([
            { $group: { _id: "$ip", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Device/User-Agent Analysis
        const deviceAnalysis = await AttackLog.aggregate([
            { $group: { _id: "$userAgent", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Return everything
        res.json({
            methodAnalysis,
            endpointAnalysis,
            attackTypeAnalysis,
            locationAnalysis,
            timeSeries,
            hourlyAnalysis,
            topIPs,
            deviceAnalysis
        });

    } catch (error) {
        console.error("Error analyzing attack logs:", error);
        res.status(500).json({ error: "Error analyzing attack logs." });
    }
};

export default analyzeAttackLogs;
