import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setAdminToken } from "../utils/auth";
import { setToken } from "../utils/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material"; 
import axiosInstance from "../api/axiosInstance";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
        isAdmin: true,
      });
      const { token } = response.data;
      const decoded = jwtDecode(token);

      if (!decoded.isAdmin) {
        alert("Access denied. Admins only.");
        return;
      }

      setToken(token);
      setAdminToken(token);
      localStorage.setItem("adminToken", token); // backup direct set
      localStorage.setItem("adminAuth", "true");
      console.log("Admin token set:", token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-light text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-light text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-accent bg-primary text-light placeholder-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-light text-sm mb-2">
              Password
            </label>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              sx={{
                input: { color: "white" },
                "& .MuiInputBase-input::placeholder": { color: "grey" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-light py-3 rounded-md hover:bg-light hover:text-primary transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
