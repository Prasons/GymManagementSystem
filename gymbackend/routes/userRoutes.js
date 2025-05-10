import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  adminLogin,
  getAllUsers,
  getUserById,
  updateUser,
  changeUserStatus,
  deleteUser
} from "../controllers/userController.js";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile); // Protected profile route
router.post("/admin/login", adminLogin); // Route for admin login

// --- Member Management ---
router.get("/all", adminProtect, getAllUsers); // List all users (admin)
router.get("/:id", protect, getUserById); // Get user by ID (admin/self)
router.put("/:id", protect, updateUser); // Update user (admin/self)
router.patch("/:id/status", adminProtect, changeUserStatus); // Change status (admin)
router.delete("/:id", adminProtect, deleteUser); // Delete user (admin)

export default router;
