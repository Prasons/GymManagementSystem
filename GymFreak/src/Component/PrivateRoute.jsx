import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode"; // Use named import for jwtDecode

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (adminOnly && !decoded.isAdmin) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
