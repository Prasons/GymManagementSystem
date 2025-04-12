// client/src/pages/Admin/Members/Index.jsx
import React, { useEffect, useState } from "react";

export default function Members() {
    const [members, setMembers] = useState([]);

    // Fetch members from your backend API
    useEffect(() => {
        fetch("http://localhost:5000/api/members")
            .then((res) => res.json())
            .then((data) => setMembers(data))
            .catch((err) => console.error("Error fetching members:", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gym Members</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Membership</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member._id}>
                            <td className="py-2 px-4 border">{member.name}</td>
                            <td className="py-2 px-4 border">{member.email}</td>
                            <td className="py-2 px-4 border">
                                {member.membershipType}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
