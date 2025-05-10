import pool from "../config/db.js";

// Get all training schedules
export const getTrainingSchedules = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM trainingschedules ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching training schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new training schedule (admin only)
export const createTrainingSchedule = async (req, res) => {
  const { name, description, days, time, activities, trainer } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO trainingschedules (name, description, days, time, activities, trainer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, days, time, JSON.stringify(activities), trainer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating training schedule:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a training schedule (admin only)
export const updateTrainingSchedule = async (req, res) => {
  const { id } = req.params;
  const { name, description, days, time, activities, trainer } = req.body;
  try {
    const result = await pool.query(
      `UPDATE trainingschedules SET name=$1, description=$2, days=$3, time=$4, activities=$5, trainer=$6 WHERE id=$7 RETURNING *`,
      [name, description, days, time, JSON.stringify(activities), trainer, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Training schedule not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating training schedule:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a training schedule (admin only)
export const deleteTrainingSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM trainingschedules WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Training schedule not found" });
    }
    res.json({ message: "Training schedule deleted" });
  } catch (err) {
    console.error("Error deleting training schedule:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all of the user's enrolled training schedules
export const getUserTrainingSchedules = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      `SELECT t.* FROM user_trainingschedules u JOIN trainingschedules t ON u.schedule_id = t.id WHERE u.user_id = $1 ORDER BY u.enrolled_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching user training schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Enroll user in training schedules (multi-select)
export const enrollUserTrainingSchedules = async (req, res) => {
  const userId = req.user.userId;
  const { schedule_ids } = req.body; // expects an array
  if (!Array.isArray(schedule_ids)) {
    return res.status(400).json({ message: "schedule_ids must be an array" });
  }
  try {
    // Remove all previous enrollments
    await pool.query("DELETE FROM user_trainingschedules WHERE user_id = $1", [userId]);
    // Insert all selected schedules
    for (const scheduleId of schedule_ids) {
      await pool.query(
        "INSERT INTO user_trainingschedules (user_id, schedule_id) VALUES ($1, $2)",
        [userId, scheduleId]
      );
    }
    res.json({ message: "Training schedules enrolled" });
  } catch (err) {
    console.error("Error enrolling user training schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Unenroll user from all training schedules
export const unenrollAllUserTrainingSchedules = async (req, res) => {
  try {
    const userId = req.user.userId;
    await pool.query("DELETE FROM user_trainingschedules WHERE user_id = $1", [userId]);
    res.json({ message: "All user training schedules unenrolled" });
  } catch (err) {
    console.error("Error unenrolling user training schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Unenroll user from a specific training schedule
export const unenrollUserTrainingSchedule = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { schedule_id } = req.params;
    const result = await pool.query(
      "DELETE FROM user_trainingschedules WHERE user_id = $1 AND schedule_id = $2 RETURNING *",
      [userId, schedule_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Training schedule not found for user" });
    }
    res.json({ message: "Training schedule unenrolled from user" });
  } catch (err) {
    console.error("Error unenrolling user training schedule:", err);
    res.status(500).json({ message: "Server error" });
  }
};
