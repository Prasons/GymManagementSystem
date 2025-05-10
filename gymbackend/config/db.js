import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER, // your postgres username
  host: process.env.DB_HOST, // usually 'localhost'
  database: process.env.DB_NAME, // your database name (e.g., gymfreakdb)
  password: process.env.DB_PASSWORD, // your postgres password
  port: process.env.DB_PORT, // usually 5432
});

// Test database connection
(async () => {
  try {
    const res = await pool.query("SELECT * FROM users LIMIT 1");
    console.log("Database connection successful. Sample data:", res.rows);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

export default pool;
