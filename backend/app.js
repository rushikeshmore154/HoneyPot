import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Import to define __dirname
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import mainRouter from "./routes/index.js";

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

// Allow all origins (for development purposes)
app.use(cors());

// OR configure specific origins (recommended for production)
// const corsOptions = {
//     origin: "http://localhost:5173", // Replace with the frontend's URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow cookies if needed
// };
// app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/api/hospital/backup-db', (req, res) => {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || "Unknown";
    const time = new Date().toISOString();
    const log = `[${time}] Suspicious access attempt to /api/backup-db from IP: ${ip}, User-Agent: ${userAgent}\n`;

    // Log the details to a file
    const logFilePath = path.join(__dirname, "suspicious_access_log.txt");
    fs.appendFileSync(logFilePath, log);

    console.log(`[ALERT] ${log}`);
    res.status(403).json({ message: "Access Denied" });
});

// Example honeypot function
app.get('/api/hospital/fakedata', (req, res) => {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || "Unknown";
    const time = new Date().toISOString();
    const log = `[${time}] Honeypot triggered at /api/fake-endpoint from IP: ${ip}, User-Agent: ${userAgent}\n`;

    // Log the honeypot activity
    const honeypotLogFilePath = path.join(__dirname, "honeypot_log.txt");
    fs.appendFileSync(honeypotLogFilePath, log);

    console.log(`[HONEYPOT ALERT] ${log}`);
    res.status(404).json({ message: "Endpoint not found" });
});

// Honeypot endpoint that looks like a sensitive internal tool
app.all('/api/internal/exportPatientData', (req, res) => {
    const ip = req.ip;
    const method = req.method;
    const userAgent = req.headers['user-agent'] || "Unknown";
    const time = new Date().toISOString();
    const headers = JSON.stringify(req.headers, null, 2);
    const query = JSON.stringify(req.query, null, 2);
    const body = JSON.stringify(req.body, null, 2);

    const log = `
[HONEYPOT ALERT] 
Time: ${time}
IP: ${ip}
Method: ${method}
User-Agent: ${userAgent}
Path: ${req.originalUrl}
Headers: ${headers}
Query: ${query}
Body: ${body}
-----------------------------
`;

    const honeypotLogFilePath = path.join(__dirname, "honeypot_log.txt");
    fs.appendFileSync(honeypotLogFilePath, log);

    console.log(log);

    // Respond like it’s broken or down for maintenance (not a flat 404)
    res.status(200).json({
        message: "Internal system temporarily unavailable. Please contact IT support."
    });
});


app.use("/api", mainRouter);

const start = async () => {
    await connectDb();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

start();