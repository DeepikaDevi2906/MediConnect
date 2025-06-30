import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";

const PatientAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) return;
                          
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/patient/appointments/${user.id}`
        );
        console.log("✅ Appointments fetched:", res.data);
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (!user) return <p>🔒 Please log in to view your appointments.</p>;
  if (loading) return <p>⏳ Loading your appointments...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <p>🗓️ You haven't booked any appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.appointment_id} style={{ marginBottom: "10px" }}>
              <strong>Date:</strong> {appt.date} | <strong>Time:</strong> {appt.time} |{" "}
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    appt.status === "Confirmed"
                      ? "green"
                      : appt.status === "Cancelled"
                      ? "red"
                      : "orange",
                }}
              >
                {appt.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientAppointments;

