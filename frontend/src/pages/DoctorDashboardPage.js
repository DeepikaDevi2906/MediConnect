import React from "react";
import { Link } from "react-router-dom";

const DoctorDashboardPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Doctor Dashboard</h2>
      <p style={styles.subText}>Welcome! What would you like to do today?</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/doctor/add-profile" style={styles.link}>
            📝 Add/Edit Profile
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/doctor/availability" style={styles.link}>
            📆 Update Availability
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/doctor/appointments" style={styles.link}>
            📋 View Appointments
          </Link>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#1e1e2f",
    marginBottom: "10px",
  }
}


export default DoctorDashboardPage;
