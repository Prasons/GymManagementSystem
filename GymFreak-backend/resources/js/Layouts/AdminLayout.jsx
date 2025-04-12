import { Link, usePage } from "@inertiajs/inertia-react";
import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiSettings,
    FiPieChart,
} from "react-icons/fi";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-700 text-white shadow-lg">
                <div className="p-4 flex items-center space-x-2 border-b border-indigo-600">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-bold">GF</span>
                    </div>
                    <span className="text-xl font-bold">GymFreak Admin</span>
                </div>

                <nav className="p-4 space-y-1">
                    <NavLink
                        href="/admin"
                        icon={<FiPieChart />}
                        active={route().current("admin.dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href="/admin/members"
                        icon={<FiUsers />}
                        active={route().current("admin.members.*")}
                    >
                        Members
                    </NavLink>
                    <NavLink
                        href="/admin/trainers"
                        icon={<FiUsers />}
                        active={route().current("admin.trainers.*")}
                    >
                        Trainers
                    </NavLink>
                    <NavLink
                        href="/admin/schedule"
                        icon={<FiCalendar />}
                        active={route().current("admin.schedule")}
                    >
                        Classes
                    </NavLink>
                    <NavLink
                        href="/admin/settings"
                        icon={<FiSettings />}
                        active={route().current("admin.settings")}
                    >
                        Settings
                    </NavLink>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Bar */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {pageTitle}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <FiBell className="text-gray-600" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-700 font-medium text-sm">
                                    {auth.user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            </div>
                            <span className="font-medium">
                                {auth.user.name}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}

const NavLink = ({ href, icon, active, children }) => (
    <Link
        href={href}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            active
                ? "bg-indigo-800 text-white"
                : "text-indigo-100 hover:bg-indigo-600"
        }`}
    >
        <span className="text-lg">{icon}</span>
        <span>{children}</span>
    </Link>
);
