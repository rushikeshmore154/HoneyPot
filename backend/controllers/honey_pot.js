// Hospital
export const getAllHospital_HoneyPot = (req, res) => {
    res.json([
        { id: "hosp_001", name: "CityCare Hospital", location: "New York" },
        { id: "hosp_002", name: "Green Valley Medical Center", location: "California" }
    ]);
};

// Get hospital by ID
export const getHospitalById_HoneyPot = (req, res) => {
    res.json({
        id: req.params.hospitalId,
        name: "CityCare Hospital",
        location: "New York",
        bedsAvailable: 25
    });
};


// User

// Get all users
export const getAllUser_HoneyPot = (req, res) => {
    res.json([
        { id: "user_101", name: "Alice Johnson", role: "Patient" },
        { id: "user_102", name: "Dr. Robert Smith", role: "Doctor" }
    ]);
};

// Get user by ID
export const getUserById_HoneyPot = (req, res) => {
    res.json({
        id: req.params.userId,
        name: "Alice Johnson",
        role: "Patient",
        email: "alice@example.com",
        phone: "9876543210"
    });
};




// Request 
export const getAllRequest_HoneyPot = (req, res) => {
    res.json([
        { id: "req_001", type: "Blood Donation", status: "Pending" },
        { id: "req_002", type: "Organ Donation", status: "Approved" }
    ]);
};

// Get request details
export const getRequestById_HoneyPot = (req, res) => {
    res.json({
        id: req.params.requestId,
        type: "Blood Donation",
        requestedBy: "user_101",
        status: "Pending",
        createdAt: "2025-04-20T10:00:00Z"
    });
};


// Appointments 
// List all appointments
export const getAllAppointment_HoneyPot = (req, res) => {
    res.json([
        { id: "appt_001", patient: "Alice Johnson", doctor: "Dr. Smith", date: "2025-04-25" },
        { id: "appt_002", patient: "Bob Martin", doctor: "Dr. Laura", date: "2025-04-26" }
    ]);
};

// Get appointment details
export const getAppointmentById_HoneyPot = (req, res) => {
    res.json({
        id: req.params.appointmentId,
        patient: "Alice Johnson",
        doctor: "Dr. Smith",
        date: "2025-04-25",
        status: "Confirmed"
    });
};

// Items
// List hospital inventory items
export const getAllInventory_HoneyPot = (req, res) => {
    res.json([
        { id: "item_001", name: "Surgical Mask", quantity: 500 },
        { id: "item_002", name: "Ventilator", quantity: 10 }
    ]);
};

// Get item details
export const getInventoryById_HoneyPot = (req, res) => {
    res.json({
        id: req.params.itemId,
        name: "Surgical Mask",
        quantity: 500,
        lastRestocked: "2025-04-15"
    });
};
