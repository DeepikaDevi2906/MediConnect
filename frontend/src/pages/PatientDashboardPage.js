import React from "react";
import { Link } from "react-router-dom";

const PatientDashboardPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Patient Dashboard</h2>
      <p style={styles.subText}>Welcome! What would you like to do?</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/patient/book-appointment" style={styles.link}>
            📅 Book Appointment
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/patient/appointments" style={styles.link}>
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
  },
  subText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "30px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "20px",
  },
  link: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#00bcd4",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#0097a7",
  },
};

export default PatientDashboardPage;
