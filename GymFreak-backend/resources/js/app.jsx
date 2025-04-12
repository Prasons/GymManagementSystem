import { Link } from "react-router-dom";

const AdminDashboard = ({ onLogout }) => {
    // Sample data - replace with real API calls
    const stats = {
        members: 124,
        activeTrainers: 8,
        monthlyRevenue: "$5,280",
        upcomingClasses: 3,
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <button onClick={onLogout}>Logout</button>

            <div className="stats-grid">
                <StatCard
                    title="Total Members"
                    value={stats.members}
                    icon="👥"
                />
                <StatCard
                    title="Active Trainers"
                    value={stats.activeTrainers}
                    icon="💪"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={stats.monthlyRevenue}
                    icon="💰"
                />
                <StatCard
                    title="Upcoming Classes"
                    value={stats.upcomingClasses}
                    icon="⏰"
                />
            </div>

            <div className="quick-actions">
                <Link to="/admin/members" className="action-card">
                    Manage Members
                </Link>
                <Link to="/admin/trainers" className="action-card">
                    Manage Trainers
                </Link>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
    <div className="stat-card">
        <span className="stat-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

export default AdminDashboard;
