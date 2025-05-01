import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Adjust the path as necessary
import userRoutes from "./routes/userRoutes.js"; // Import user routes

dotenv.config();

const app = express();
app.use(express.json());

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database test failed:", err.message);
    res.status(500).send("Database connection failed");
  }
});

// Use user routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
