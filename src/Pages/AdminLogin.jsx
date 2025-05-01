import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuthToken", "admin-token");
      onLogin();
      navigate("/admin");
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md bg-secondary p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-light mb-6">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-light mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-accent text-light rounded outline-none focus:ring-2 focus:ring-light"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter admin username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-light mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-accent text-light rounded outline-none focus:ring-2 focus:ring-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-light text-secondary font-semibold py-2 rounded hover:bg-white transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
