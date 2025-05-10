import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getUserCart);
router.delete("/:id", protect, removeFromCart);

export default router;
