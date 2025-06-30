import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// ✅ All imports go first
import AppNavbar from './components/AppNavbar';
import AddDoctorProfile from "./components/AddDoctorProfile";
import UpdateAvailability from "./components/UpdateAvailability";
import DoctorAppointments from "./components/DoctorAppointments";
import BookAppointment from "./components/BookAppointment";
import PatientAppointments from "./components/PatientAppointments";

import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// ✅ Then create context after imports
export const AuthContext = createContext();


function App() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null); // ✅ add this state for AuthContext

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        if (res.data && res.data.message) {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log("Backend not reachable", err));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}> {/* ✅ WRAP HERE */}
      <Router>
        <AppNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/doctor" element={<DoctorDashboardPage />} />
            <Route path="/doctor/add-profile" element={<AddDoctorProfile />} />
            <Route path="/doctor/availability" element={<UpdateAvailability />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/patient" element={<PatientDashboardPage />} />
            <Route path="/patient/book-appointment" element={<BookAppointment />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;


