import React, { useState } from "react";

const AdminMembers = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Pending",
    },
  ]);

  const toggleStatus = (id) => {
    const updatedMembers = members.map((member) =>
      member.id === id
        ? {
            ...member,
            status:
              member.status === "Active"
                ? "Inactive"
                : member.status === "Inactive"
                ? "Active"
                : member.status,
          }
        : member
    );
    setMembers(updatedMembers);
  };

  return (
    <div className="min-h-screen bg-primary text-light p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage Members</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-secondary rounded-md overflow-hidden">
          <thead className="bg-accent text-light">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t border-gray-700">
                <td className="py-3 px-6">{member.name}</td>
                <td className="py-3 px-6">{member.email}</td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      member.status === "Active"
                        ? "bg-green-500"
                        : member.status === "Inactive"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } text-light`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => toggleStatus(member.id)}
                    className="bg-accent hover:bg-light hover:text-primary transition px-4 py-2 rounded-md"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMembers;
