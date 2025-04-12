import { useState } from "react";
import { Link } from "react-router-dom";

const ManageMembers = () => {
    // Sample data - replace with API call
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "John Doe",
            membership: "Premium",
            lastCheckin: "2023-05-15",
        },
        {
            id: 2,
            name: "Jane Smith",
            membership: "Basic",
            lastCheckin: "2023-05-14",
        },
    ]);

    const deleteMember = (id) => {
        if (window.confirm("Delete this member?")) {
            setMembers(members.filter((m) => m.id !== id));
        }
    };

    return (
        <div className="admin-container">
            <div className="header-row">
                <h1>Manage Members</h1>
                <Link to="/admin/members/add" className="add-button">
                    + Add Member
                </Link>
            </div>

            <table className="members-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Membership</th>
                        <th>Last Check-in</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.membership}</td>
                            <td>{member.lastCheckin}</td>
                            <td>
                                <Link
                                    to={`/admin/members/edit/${member.id}`}
                                    className="edit-btn"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteMember(member.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageMembers;
