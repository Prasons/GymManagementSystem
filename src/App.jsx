import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Membership from "./Pages/MembershipPage";
import DietPlan from "./Pages/DietPlan";
import ReferAFriend from "./Pages/ReferPage";
import ShoppingCart from "./Pages/ShoppingCartPage";
import GymEquipment from "./Pages/GymEquipmentPage";
import Payment from "./Pages/PaymentPage";
import { useLocation } from "react-router-dom";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null
  );
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/home");
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  const location = useLocation();
  const isLandingPage = location.pathname === "/home";

  return (
    <>
      {!isLandingPage && (
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" href="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/home"} replace />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/membership" element={<Membership />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/referafriend" element={<ReferAFriend />} />
        <Route
          path="/shoppingcart"
          element={<ShoppingCart cartItems={cartItems} />}
        />
        <Route
          path="/gymequipment"
          element={<GymEquipment onAddToCart={handleAddToCart} />}
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
