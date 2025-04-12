import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/reports">View Reports</Link>
          </li>
          {/* Add more admin links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
