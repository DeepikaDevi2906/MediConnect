import React, { useState } from "react";
import axios from "axios";

const UpdateAvailability = () => {
  const [userId, setUserId] = useState("");
  const [availability, setAvailability] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/availability", {
        user_id: userId,
        availability: availability,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error updating availability");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Availability</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <label>Availability:</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value === "true")}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <button type="submit" style={{ padding: "6px 12px" }}>
          Update
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "green" }}>{message}</p>
      )}
    </div>
  );
};

export default UpdateAvailability;
