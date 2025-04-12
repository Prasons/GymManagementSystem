import { useState } from "react";

const ManageTrainers = () => {
    const [trainers, setTrainers] = useState([
        {
            id: 1,
            name: "Alex Johnson",
            specialization: "Weight Training",
            members: 15,
        },
        { id: 2, name: "Sarah Lee", specialization: "Yoga", members: 8 },
    ]);

    return (
        <div className="admin-container">
            <h1>Manage Trainers</h1>

            <div className="trainers-grid">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card">
                        <h3>{trainer.name}</h3>
                        <p>Specialization: {trainer.specialization}</p>
                        <p>Members: {trainer.members}</p>
                        <div className="trainer-actions">
                            <button className="edit-btn">Edit</button>
                            <button
                                className="delete-btn"
                                onClick={() =>
                                    setTrainers(
                                        trainers.filter(
                                            (t) => t.id !== trainer.id
                                        )
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTrainers;
