import AdminLayout from "@/Layouts/AdminLayout";
import { FiUsers, FiActivity, FiDollarSign, FiCalendar } from "react-icons/fi";

export default function Dashboard({ stats }) {
    return (
        <AdminLayout pageTitle="Dashboard Overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<FiUsers className="text-indigo-500" />}
                    title="Total Members"
                    value={stats.total_members}
                    trend="+12% from last month"
                />
                <StatCard
                    icon={<FiActivity className="text-green-500" />}
                    title="Active Now"
                    value={stats.active_members}
                    trend="5 in the gym"
                />
                <StatCard
                    icon={<FiDollarSign className="text-blue-500" />}
                    title="Monthly Revenue"
                    value={`$${stats.monthly_revenue}`}
                    trend="+18% from last month"
                />
                <StatCard
                    icon={<FiCalendar className="text-purple-500" />}
                    title="Upcoming Classes"
                    value={stats.upcoming_classes}
                    trend="3 today"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Check-ins</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats.recent_checkins.map((checkin, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-700 font-medium">
                                                    {checkin.member.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {checkin.member.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {checkin.member.membership}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(
                                            checkin.time
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {checkin.duration} mins
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

const StatCard = ({ icon, title, value, trend }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-start">
        <div className="p-3 rounded-lg bg-opacity-20 bg-gray-100 mr-4">
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            <p className="text-xs text-gray-400 mt-2">{trend}</p>
        </div>
    </div>
);
