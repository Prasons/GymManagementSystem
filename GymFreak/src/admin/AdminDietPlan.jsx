import React, { useState } from "react";

const AdminDietPlan = () => {
  const [dietPlans, setDietPlans] = useState([
    { id: 1, name: "Keto Diet", description: "High fat, low carb" },
    { id: 2, name: "Vegan Diet", description: "Plant-based food" },
  ]);

  const [newPlan, setNewPlan] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const handleAddPlan = () => {
    const newDietPlan = { ...newPlan, id: Date.now() }; // Generate unique ID based on time
    setDietPlans([...dietPlans, newDietPlan]);
    setNewPlan({ name: "", description: "" });
  };

  const handleDeletePlan = (id) => {
    setDietPlans(dietPlans.filter((plan) => plan.id !== id));
  };

  const handleEditPlan = (plan) => {
    setIsEditing(true);
    setEditPlan(plan);
  };

  const handleSaveEdit = () => {
    const updatedPlans = dietPlans.map((plan) =>
      plan.id === editPlan.id ? editPlan : plan
    );
    setDietPlans(updatedPlans);
    setIsEditing(false);
    setEditPlan(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditPlan({ ...editPlan, [name]: value });
    } else {
      setNewPlan({ ...newPlan, [name]: value });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Diet Plans</h1>

      {/* Add new diet plan */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Diet Plan</h2>
        <input
          type="text"
          name="name"
          value={isEditing ? editPlan.name : newPlan.name}
          onChange={handleChange}
          placeholder="Diet Name"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          value={isEditing ? editPlan.description : newPlan.description}
          onChange={handleChange}
          placeholder="Diet Description"
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={isEditing ? handleSaveEdit : handleAddPlan}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          {isEditing ? "Save Changes" : "Add Diet Plan"}
        </button>
      </div>

      {/* Diet plans list */}
      <h2 className="text-xl font-semibold mb-4">Existing Diet Plans</h2>
      <div className="space-y-4">
        {dietPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditPlan(plan)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDietPlan;
