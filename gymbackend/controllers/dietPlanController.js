import pool from "../config/db.js";

// Get all diet plans
export const getDietPlans = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dietplans ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching diet plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new diet plan (admin only)
export const createDietPlan = async (req, res) => {
  const { name, category, description, meals } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO dietplans (name, category, description, meals) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, category, description, JSON.stringify(meals)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating diet plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a diet plan (admin only)
export const updateDietPlan = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, meals } = req.body;
  try {
    const result = await pool.query(
      `UPDATE dietplans SET name=$1, category=$2, description=$3, meals=$4 WHERE id=$5 RETURNING *`,
      [name, category, description, JSON.stringify(meals), id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Diet plan not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating diet plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a diet plan (admin only)
export const deleteDietPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM dietplans WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Diet plan not found" });
    }
    res.json({ message: "Diet plan deleted" });
  } catch (err) {
    console.error("Error deleting diet plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all of the user's selected diet plans
export const getUserDietPlan = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      `SELECT d.* FROM user_dietplans u JOIN dietplans d ON u.dietplan_id = d.id WHERE u.user_id = $1 ORDER BY u.selected_at DESC`,
      [userId]
    );
    res.json(result.rows); // Always return an array
  } catch (err) {
    console.error("Error fetching user diet plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Set the user's selected diet plans (multi-select)
export const setUserDietPlan = async (req, res) => {
  const userId = req.user.userId;
  const { dietplan_ids } = req.body; // expects an array
  if (!Array.isArray(dietplan_ids)) {
    return res.status(400).json({ message: "dietplan_ids must be an array" });
  }
  try {
    // Remove all previous selections
    await pool.query("DELETE FROM user_dietplans WHERE user_id = $1", [userId]);
    // Insert all selected plans
    for (const planId of dietplan_ids) {
      await pool.query(
        "INSERT INTO user_dietplans (user_id, dietplan_id) VALUES ($1, $2)",
        [userId, planId]
      );
    }
    res.json({ message: "Diet plans selected" });
  } catch (err) {
    console.error("Error setting user diet plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Unset all of the user's selected diet plans
export const unsetUserDietPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    await pool.query("DELETE FROM user_dietplans WHERE user_id = $1", [userId]);
    res.json({ message: "All user diet plans removed" });
  } catch (err) {
    console.error("Error unsetting user diet plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a specific diet plan from the user's saved selections
export const removeUserDietPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { dietplan_id } = req.params;
    const result = await pool.query(
      "DELETE FROM user_dietplans WHERE user_id = $1 AND dietplan_id = $2 RETURNING *",
      [userId, dietplan_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Diet plan not found for user" });
    }
    res.json({ message: "Diet plan removed from user selection" });
  } catch (err) {
    console.error("Error removing user diet plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};
