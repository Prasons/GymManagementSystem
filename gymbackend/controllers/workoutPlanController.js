import pool from "../config/db.js";

// Get all workout plans
export const getWorkoutPlans = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workoutplans ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching workout plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new workout plan (admin only)
export const createWorkoutPlan = async (req, res) => {
  const { name, category, description, exercises } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO workoutplans (name, category, description, exercises) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, category, description, JSON.stringify(exercises)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating workout plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a workout plan (admin only)
export const updateWorkoutPlan = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, exercises } = req.body;
  try {
    const result = await pool.query(
      `UPDATE workoutplans SET name=$1, category=$2, description=$3, exercises=$4 WHERE id=$5 RETURNING *`,
      [name, category, description, JSON.stringify(exercises), id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Workout plan not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating workout plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a workout plan (admin only)
export const deleteWorkoutPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM workoutplans WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Workout plan not found" });
    }
    res.json({ message: "Workout plan deleted" });
  } catch (err) {
    console.error("Error deleting workout plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all of the user's selected workout plans
export const getUserWorkoutPlan = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      `SELECT w.* FROM user_workoutplans u JOIN workoutplans w ON u.workoutplan_id = w.id WHERE u.user_id = $1 ORDER BY u.selected_at DESC`,
      [userId]
    );
    res.json(result.rows); // Always return an array
  } catch (err) {
    console.error("Error fetching user workout plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Set the user's selected workout plans (multi-select)
export const setUserWorkoutPlan = async (req, res) => {
  const userId = req.user.userId;
  const { workoutplan_ids } = req.body; // expects an array
  if (!Array.isArray(workoutplan_ids)) {
    return res.status(400).json({ message: "workoutplan_ids must be an array" });
  }
  try {
    // Remove all previous selections
    await pool.query("DELETE FROM user_workoutplans WHERE user_id = $1", [userId]);
    // Insert all selected plans
    for (const planId of workoutplan_ids) {
      await pool.query(
        "INSERT INTO user_workoutplans (user_id, workoutplan_id) VALUES ($1, $2)",
        [userId, planId]
      );
    }
    res.json({ message: "Workout plans selected" });
  } catch (err) {
    console.error("Error setting user workout plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Unset all of the user's selected workout plans
export const unsetUserWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    await pool.query("DELETE FROM user_workoutplans WHERE user_id = $1", [userId]);
    res.json({ message: "All user workout plans removed" });
  } catch (err) {
    console.error("Error unsetting user workout plans:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove a specific workout plan from the user's saved selections
export const removeUserWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { workoutplan_id } = req.params;
    const result = await pool.query(
      "DELETE FROM user_workoutplans WHERE user_id = $1 AND workoutplan_id = $2 RETURNING *",
      [userId, workoutplan_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Workout plan not found for user" });
    }
    res.json({ message: "Workout plan removed from user selection" });
  } catch (err) {
    console.error("Error removing user workout plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};
