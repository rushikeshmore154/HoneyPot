import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

// Register required components .,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AttackLogsDashboard = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/analyze");
                setData(response.data || {}); // Ensure data is not null
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Safeguard against null or undefined data
    const methodAnalysis = data.methodAnalysis || [];
    const endpointAnalysis = data.endpointAnalysis || [];
    const attackTypeAnalysis = data.attackTypeAnalysis || [];
    const hourlyAnalysis = data.hourlyAnalysis || [];
    const topIPs = data.topIPs || [];
    const deviceAnalysis = data.deviceAnalysis || [];

    // Prepare data for charts
    const methodData = {
        labels: methodAnalysis.map((item) => item._id || "Unknown"),
        datasets: [
            {
                label: "HTTP Methods",
                data: methodAnalysis.map((item) => item.count || 0),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const endpointData = {
        labels: endpointAnalysis.map((item) => item._id || "Unknown"),
        datasets: [
            {
                label: "API Endpoints",
                data: endpointAnalysis.map((item) => item.count || 0),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
        ],
    };

    const attackTypeData = {
        labels: attackTypeAnalysis.map((item) => item._id || "Unknown"),
        datasets: [
            {
                label: "Attack Types",
                data: attackTypeAnalysis.map((item) => item.count || 0),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    };

    const hourlyData = {
        labels: hourlyAnalysis.map((item) => (item._id !== null ? `${item._id}:00` : "Unknown")),
        datasets: [
            {
                label: "Hourly Attacks",
                data: hourlyAnalysis.map((item) => item.count || 0),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const topIPsData = {
        labels: topIPs.map((item) => item._id || "Unknown"),
        datasets: [
            {
                label: "Top IPs",
                data: topIPs.map((item) => item.count || 0),
                backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
        ],
    };

    const deviceData = {
        labels: deviceAnalysis.map((item) => item._id || "Unknown"),
        datasets: [
            {
                label: "Devices/User-Agents",
                data: deviceAnalysis.map((item) => item.count || 0),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h1>Attack Logs Dashboard</h1>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>HTTP Methods</h3>
                <Bar data={methodData} />
            </div>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>API Endpoints</h3>
                <Bar data={endpointData} />
            </div>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>Attack Types</h3>
                <Pie data={attackTypeData} />
            </div>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>Hourly Attacks</h3>
                <Line data={hourlyData} />
            </div>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>Top IPs</h3>
                <Bar data={topIPsData} />
            </div>
            <div style={{ width: "600px", margin: "20px auto" }}>
                <h3>Devices/User-Agents</h3>
                <Bar data={deviceData} />
            </div>
        </div>
    );
};

export default AttackLogsDashboard;