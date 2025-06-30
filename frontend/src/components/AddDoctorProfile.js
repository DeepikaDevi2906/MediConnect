import React, { useState } from "react";
import axios from "axios";

const AddDoctorProfile = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    specialization: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/add", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add/Edit Doctor Profile</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>User ID:</label>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <label>Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button type="submit" style={{ padding: "6px 12px" }}>
          Submit
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "green" }}>{message}</p>
      )}
    </div>
  );
};

export default AddDoctorProfile;
