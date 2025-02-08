import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <div className="App font-main">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
