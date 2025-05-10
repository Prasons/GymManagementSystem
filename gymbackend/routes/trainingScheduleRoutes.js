import express from "express";
import {
  getTrainingSchedules,
  createTrainingSchedule,
  updateTrainingSchedule,
  deleteTrainingSchedule,
  getUserTrainingSchedules,
  enrollUserTrainingSchedules,
  unenrollAllUserTrainingSchedules,
  unenrollUserTrainingSchedule,
} from "../controllers/trainingScheduleController.js";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public: Get all training schedules
router.get("/", getTrainingSchedules);

// Admin: Create, update, delete training schedules
router.post("/", protect, adminProtect, createTrainingSchedule);
router.put("/:id", protect, adminProtect, updateTrainingSchedule);
router.delete("/:id", protect, adminProtect, deleteTrainingSchedule);

// User: Get/enroll/unenroll training schedules
router.get("/user/enrolled", protect, getUserTrainingSchedules);
router.post("/user/enrolled", protect, enrollUserTrainingSchedules);
// Unenroll a specific schedule (must come before /user/enrolled)
router.delete("/user/enrolled/:schedule_id", protect, unenrollUserTrainingSchedule);
router.delete("/user/enrolled", protect, unenrollAllUserTrainingSchedules);

export default router;
