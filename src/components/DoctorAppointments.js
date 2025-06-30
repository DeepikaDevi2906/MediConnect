import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        status: newStatus,
      });
      alert("Status updated!");
      // Refresh appointments
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointment_id}>
              <td>{appt.patient_id}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>{appt.status}</td>
              <td>
                {appt.status === "Pending" && (
                  <>
                    <button onClick={() => updateStatus(appt.appointment_id, "Confirmed")}>
                      Confirm
                    </button>
                    <button onClick={() => updateStatus(appt.appointment_id, "Cancelled")}>
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;

