// AppNavbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // assuming AuthContext is exported from App.js

const AppNavbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="custom-navbar">
      <Link to="/" className="app-name">MediConnect</Link>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            {user.role === "doctor" && (
              <Link to="/doctor">Doctor Dashboard</Link>
            )}
            {user.role === "patient" && (
              <Link to="/patient">Patient Dashboard</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
