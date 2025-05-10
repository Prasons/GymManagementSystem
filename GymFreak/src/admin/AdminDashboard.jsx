import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUsers,
  FaDumbbell,
  FaMoneyBillWave,
  FaGift,
  FaShoppingCart,
  FaUserTie,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <FaUsers />, label: "Total Members", value: 120 },
    { icon: <FaDumbbell />, label: "Trainers", value: 8 },
    { icon: <FaMoneyBillWave />, label: "Monthly Revenue", value: "$4,500" },
    { icon: <FaGift />, label: "Referrals This Month", value: 25 },
  ];

  const navigationLinks = [
    { path: "/admin/members", label: "Manage Members", icon: <FaUsers /> },
    { path: "/admin/trainers", label: "Manage Trainers", icon: <FaUserTie /> },
    {
      path: "/admin/products",
      label: "Manage Products",
      icon: <FaShoppingCart />,
    },
    {
      path: "/admin/diet-plan",
      label: "Manage Diet Plans",
      icon: <FaClipboardList />,
    },
    {
      path: "/admin/workout-plan",
      label: "Manage Workout Plans",
      icon: <FaDumbbell />,
    },
    {
      path: "/admin/training-schedule",
      label: "Manage Training Schedules",
      icon: <FaDumbbell />,
    },
    {
      path: "/admin/payment",
      label: "Manage Payments",
      icon: <FaMoneyCheckAlt />,
    },
    { path: "/admin/referral", label: "Manage Referrals", icon: <FaGift /> },
    { path: "/admin/referral-dashboard", label: "Referral Dashboard", icon: <FaGift /> },
    { path: "/admin/classes", label: "Manage Classes", icon: <FaDumbbell /> },
  ];

  const handleLogout = () => {
    // Clear admin session (adjust depending on how you store login info)
    localStorage.removeItem("adminToken");
    // Redirect to admin login
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-primary text-light p-8 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-8 right-8 bg-accent text-primary px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-light hover:text-accent transition-all duration-300"
      >
        <FaSignOutAlt />
        Logout
      </button>

      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-secondary p-6 rounded-lg flex flex-col items-center shadow-md"
          >
            <div className="text-4xl text-accent mb-2">{stat.icon}</div>
            <p className="text-lg font-semibold">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Navigation Section */}
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Quick Navigation
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationLinks.map((nav, idx) => (
          <Link
            to={nav.path}
            key={idx}
            className="bg-secondary p-6 rounded-lg flex flex-col items-center shadow-md hover:bg-accent hover:text-primary transition-all duration-300"
          >
            <div className="text-4xl mb-2">{nav.icon}</div>
            <p className="text-lg font-semibold">{nav.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
