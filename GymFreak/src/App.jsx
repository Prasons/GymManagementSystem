import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GymEquipmentPage from "./Pages/GymEquipmentPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import ReferPage from "./Pages/ReferPage";
import DietPlanPage from "./Pages/DietPlan";
import PaymentPage from "./Pages/PaymentPage";
import AdminDashboard from "./AdminPages/AdminDashboard";
import ManageUsers from "./AdminPages/ManageUsers";

// Temporary Navbar component (add this if you don't have one)
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <a href="/" style={{ marginRight: "1rem" }}>
        Home
      </a>
      {isAuthenticated ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <a href="/login" style={{ marginRight: "1rem" }}>
          Login
        </a>
      )}
    </nav>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null
  );

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCartItems, { ...item, quantity: 1 }];
    });
  };

  const handleLogin = () => {
    localStorage.setItem("authToken", "dummy-token");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/gymequipment"
          element={<GymEquipmentPage onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/shoppingcart"
          element={<ShoppingCartPage cartItems={cartItems} />}
        />
        <Route path="/referafriend" element={<ReferPage />} />
        <Route path="/dietplan" element={<DietPlanPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            isAuthenticated ? (
              <ManageUsers onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
