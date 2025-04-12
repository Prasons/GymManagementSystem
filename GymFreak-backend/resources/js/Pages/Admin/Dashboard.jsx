import React from "react";
import { Head } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ members }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
            <div className="mt-6">
                <h2 className="text-xl mb-4">Recent Members</h2>
                <ul>
                    {members.map((member) => (
                        <li key={member.id}>{member.name}</li>
                    ))}
                </ul>
            </div>
        </AdminLayout>
    );
}
