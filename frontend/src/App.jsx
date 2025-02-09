import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/HospitalLoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HospitalLoginPage from "./pages/auth/HospitalLoginPage";
import UserLoginPage from "./pages/auth/UserLoginPage";
import Protected from "./HOC/authprovider";
import HomePage from "./pages/HomePage";
import HospitalDashboardPage from "./pages/HospitalDashboardPage";
import { Toaster } from "./components/ui/toaster";
import HospitalAnalyticsPage from "./pages/HospitalAnalyticsPage";
import HospitalAppointmentPages from "./pages/HospitalAppointmentPages";
import InventoryManagement from "./pages/HospitalInventory";

function App() {
    return (
        <div className="App font-main">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/auth/hospital/login"
                        element={<HospitalLoginPage />}
                    />
                    <Route path="/auth/login" element={<UserLoginPage />} />
                    <Route path="/auth/signup" element={<SignupPage />} />
                    <Route
                        path="/home"
                        element={
                            <Protected>
                                <HomePage />
                            </Protected>
                        }
                    />
                    <Route
                        path="/hospital/dashboard"
                        element={
                            <Protected>
                                <HospitalDashboardPage />
                            </Protected>
                        }
                    />
                    <Route
                        path="/hospital/dashboard/analytics"
                        element={
                            <Protected>
                                <HospitalAnalyticsPage />
                            </Protected>
                        }
                    />
                    <Route
                        path="/hospital/dashboard/appointments"
                        element={
                            <Protected>
                                <HospitalAppointmentPages />
                            </Protected>
                        }
                    />
                    <Route
                        path="/hospital/dashboard/inventory"
                        element={
                            <Protected>
                                <InventoryManagement />
                            </Protected>
                        }
                    />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
