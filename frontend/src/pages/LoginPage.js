import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext); // ✅ access setUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    if (res.data && res.data.role && res.data.id) {
      const user = {
        id: res.data.id,               // ✅ fix
        email: res.data.email,
        role: res.data.role,
      };

      setUser(user); // ✅ global context update

      // optional localStorage
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token || "dummy");

      // ✅ route
      if (res.data.role === "doctor") {
        navigate("/doctor");
      } else if (res.data.role === "patient") {
        navigate("/patient");
      }
    } else {
      setError("Invalid login response");
    }
  } catch (err) {
    console.error(err);
    setError("Invalid email or password");
  }
};


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;





