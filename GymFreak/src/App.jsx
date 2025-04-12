import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./AdminPages/AdminDashboard";
import Members from "./AdminPages/Members";
import Home from "./Pages/Home";

// Main App component
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// Your existing App logic
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" href="/login">
                Login
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/members"
          element={
            isAuthenticated ? <Members /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/home"} replace />
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;
