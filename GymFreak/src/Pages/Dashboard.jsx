import React from "react";
import {
  FaCreditCard,
  FaUserFriends,
  FaClipboardList,
  FaShoppingCart,
  FaDumbbell,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const options = [
    { name: "Membership", icon: <FaCreditCard /> },
    { name: "Diet Plan", icon: <FaClipboardList /> },
    { name: "Refer a Friend", icon: <FaUserFriends /> },
    { name: "Shopping Cart", icon: <FaShoppingCart /> },
    { name: "Gym Equipment", icon: <FaDumbbell /> },
    { name: "Payment", icon: <FaMoneyBillWave FaMoneyBillWave /> },
  ];

  return (
    <div className="min-h-screen bg-primary text-light">
      {/* Dashboard Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-light">
          Welcome to Your Dashboard
        </h1>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-6">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-secondary p-6 rounded-lg shadow-lg text-center hover:bg-accent cursor-pointer transition-colors duration-300"
            onClick={() =>
              navigate(`/${option.name.toLowerCase().replace(/ /g, "")}`)
            }
          >
            <div className="text-4xl mb-4">{option.icon}</div>
            <h3 className="text-xl text-light">{option.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
