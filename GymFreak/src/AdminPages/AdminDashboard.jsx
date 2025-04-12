const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout}>Logout</button>

      {/* Add your admin content here */}
      <div className="stats">{/* Dashboard stats and components */}</div>
    </div>
  );
};

export default AdminDashboard;
