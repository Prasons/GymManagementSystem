import pool from "../config/db.js";

// Add a product
export const addProduct = async (req, res) => {
  const { name, price, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

  console.log("Incoming request payload:", req.body); // Log the incoming request payload

  try {
    await pool.query(
      "INSERT INTO products (name, price, category, image) VALUES ($1, $2, $3, $4)",
      [name, price, category, image]
    );

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Database error:", err.message); // Log database errors
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
