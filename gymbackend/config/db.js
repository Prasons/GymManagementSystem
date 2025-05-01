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

export default pool;
