import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../App";

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor_id: "",
    date: "",
    time: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/available");
        setDoctors(res.data.doctors);
      } catch (err) {
        console.error("Doctor Fetch Error:", err.message);
        setMessage("❌ Could not load doctors.");
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctor_id, date, time } = formData;

    if (!user || !user.id) {
      setMessage("⚠️ Please log in first.");
      return;
    }

    if (!doctor_id || !date || !time) {
      setMessage("⚠️ Please fill all fields before submitting.");
      return;
    }

    const dataToSend = {
      doctor_id,
      patient_id: user.id, // ✅ auto-filled from context
      date,
      time,
    };

    console.log("📦 Submitting with:", dataToSend);

    try {
      const response = await axios.post("http://localhost:5000/book", dataToSend);
      console.log("✅ Backend Response:", response.data);
      setMessage("✅ Appointment booked successfully!");
      setFormData({ doctor_id: "", date: "", time: "" });
    } catch (err) {
      const errorData = err.response?.data || err.message;
      console.error("❌ Booking Error Response:", errorData);
      setMessage("❌ Failed to book appointment: " + JSON.stringify(errorData));
    }
  };

  return (
    <div className="container mt-20">
      <h2 className="text-center mb-20">Book Appointment</h2>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("✅") ? "green" : "red",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor:</label>
          <select
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="mt-20">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;




