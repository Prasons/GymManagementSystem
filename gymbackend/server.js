import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Import pool
import { registerUser, loginUser } from "./controllers/userController.js"; // Import controller functions

dotenv.config();

const app = express();
app.use(express.json()); // For parsing JSON bodies

// Register user route
app.post("/register", registerUser);

// Login user route
app.post("/login", loginUser);

// Database test route (just for testing the database connection)
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database test failed:", err.message);
    res.status(500).send("Database connection failed");
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
