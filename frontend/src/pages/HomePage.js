import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Doctor Appointment System</h1>
      <p>Book and manage appointments easily.</p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/login" style={{ padding: "10px 20px", border: "1px solid #333", textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/signup" style={{ padding: "10px 20px", border: "1px solid #333", textDecoration: "none" }}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
