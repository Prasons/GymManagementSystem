import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { saveTokens } from "../utils/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post("/users/login", { email, password });
        // Support both 'token' and 'accessToken' keys from backend
        const accessToken = response.data.accessToken || response.data.token;
        const refreshToken = response.data.refreshToken;
        if (!accessToken) {
          alert("Login failed: No token received");
          return;
        }
        saveTokens({
          accessToken,
          refreshToken,
        });
        onLogin(); // Call the parent's login function
        navigate("/dashboard"); // Redirect after login
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "Invalid email") {
            alert("The email you entered does not exist.");
          } else if (error.response.data.message === "Invalid password") {
            alert("The password you entered is incorrect.");
          } else {
            alert("Login failed. Please try again.");
          }
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-light text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-accent bg-primary text-light placeholder-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-light py-3 rounded-md hover:bg-light hover:text-primary transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
