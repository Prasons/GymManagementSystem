import express from "express";
import {
  getWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getUserWorkoutPlan,
  setUserWorkoutPlan,
  unsetUserWorkoutPlan,
  removeUserWorkoutPlan,
} from "../controllers/workoutPlanController.js";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public: Get all workout plans
router.get("/", getWorkoutPlans);

// Admin: Create, update, delete workout plans
router.post("/", protect, adminProtect, createWorkoutPlan);
router.put("/:id", protect, adminProtect, updateWorkoutPlan);
router.delete("/:id", protect, adminProtect, deleteWorkoutPlan);

// User: Get/set/unset selected workout plan
router.get("/user/selected", protect, getUserWorkoutPlan);
router.post("/user/selected", protect, setUserWorkoutPlan);
// Remove a specific workout plan from selection (must come before /user/selected)
router.delete("/user/selected/:workoutplan_id", protect, removeUserWorkoutPlan);
router.delete("/user/selected", protect, unsetUserWorkoutPlan);

export default router;
