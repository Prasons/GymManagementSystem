import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

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

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMembers from "./admin/AdminMembers";
import AdminDietPlan from "./admin/AdminDietPlan";
import AdminReferral from "./admin/AdminReferral";
import AdminProducts from "./admin/AdminProducts";
import AdminTrainers from "./admin/AdminTrainers";
import AdminPayment from "./admin/AdminPayment";
import AdminClasses from "./admin/AdminClasses";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("adminAuth")) {
    return <Navigate to="/admin/login" />;
  }
  return children;
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") !== null;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/home";

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
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    navigate("/home");
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <>
      {!isLandingPage && (
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {isAuthenticated || isAdminAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/admin/login">
                  Admin Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAdminAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
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

        {/* Admin Routes */}
        <Route path="admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute>
              <AdminMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/diet-plan"
          element={
            <ProtectedRoute>
              <AdminDietPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/referral"
          element={
            <ProtectedRoute>
              <AdminReferral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute>
              <AdminTrainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payment"
          element={
            <ProtectedRoute>
              <AdminPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute>
              <AdminClasses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;
