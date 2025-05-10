import express from "express";
import multer from "multer";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Route to get all products
router.get("/", getProducts);

// Route to add a new product
router.post("/add", upload.single("image"), addProduct);

// Route to delete a product
router.delete("/:id", deleteProduct);

export default router;
