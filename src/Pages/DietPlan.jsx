import React, { useState } from "react";

const DietPlanPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Weight Loss");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const dietPlans = {
    "Weight Loss": [
      {
        id: 1,
        name: "Low Carb Plan",
        details:
          "This plan focuses on reducing carbs and increasing protein intake.",
        meals: [
          "Breakfast: Eggs & Avocado",
          "Lunch: Grilled Chicken Salad",
          "Dinner: Baked Salmon & Veggies",
        ],
      },
      {
        id: 2,
        name: "Keto Plan",
        details: "High fat and low carb plan designed for weight loss.",
        meals: [
          "Breakfast: Bulletproof Coffee",
          "Lunch: Zucchini Noodles & Meatballs",
          "Dinner: Steak & Broccoli",
        ],
      },
    ],
    "Muscle Gain": [
      {
        id: 3,
        name: "High Protein Plan",
        details: "This plan increases protein intake for muscle growth.",
        meals: [
          "Breakfast: Protein Smoothie",
          "Lunch: Grilled Chicken & Rice",
          "Dinner: Beef Steak & Sweet Potato",
        ],
      },
      {
        id: 4,
        name: "Mass Gainer Plan",
        details: "Includes calorie-dense meals to help gain mass.",
        meals: [
          "Breakfast: Oatmeal & Banana",
          "Lunch: Chicken Pasta",
          "Dinner: Salmon & Quinoa",
        ],
      },
    ],
    Maintenance: [
      {
        id: 5,
        name: "Balanced Diet Plan",
        details: "A balanced plan to maintain weight and health.",
        meals: [
          "Breakfast: Greek Yogurt & Berries",
          "Lunch: Turkey Sandwich",
          "Dinner: Grilled Fish & Veggies",
        ],
      },
    ],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-primary text-light p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Diet Plans</h1>

      {/* Category Selection */}
      <div className="flex justify-center gap-4 mb-8">
        {Object.keys(dietPlans).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`py-2 px-4 rounded-md font-semibold transition ${
              selectedCategory === category
                ? "bg-accent text-light"
                : "bg-secondary text-light hover:bg-accent hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Diet Plans List */}
      {!selectedPlan ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {dietPlans[selectedCategory].map((plan) => (
            <div
              key={plan.id}
              className="bg-secondary p-6 rounded-md hover:bg-accent hover:text-primary transition cursor-pointer"
              onClick={() => setSelectedPlan(plan)}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm">{plan.details}</p>
            </div>
          ))}
        </div>
      ) : (
        // Diet Plan Details
        <div className="max-w-3xl mx-auto bg-secondary p-6 rounded-md">
          <button
            onClick={() => setSelectedPlan(null)}
            className="text-accent underline hover:text-light mb-4 block"
          >
            Back to Plans
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedPlan.name}</h2>
          <p className="mb-4">{selectedPlan.details}</p>
          <h3 className="text-xl font-semibold mb-2">Meals:</h3>
          <ul className="list-disc list-inside">
            {selectedPlan.meals.map((meal, index) => (
              <li key={index} className="mb-2">
                {meal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DietPlanPage;
