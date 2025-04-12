import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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

        {/* Admin routes */}
        <PrivateRoute path="/admin" element={<AdminDashboard />} />
        <PrivateRoute path="/admin/users" element={<ManageUsers />} />
        {/* Add more admin routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
