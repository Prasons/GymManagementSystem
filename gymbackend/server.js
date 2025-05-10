import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dietPlanRoutes from "./routes/dietPlanRoutes.js";
import workoutPlanRoutes from "./routes/workoutPlanRoutes.js";
import trainingScheduleRoutes from "./routes/trainingScheduleRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5175"],
    credentials: true,
  })
);
app.use(express.json());
app.options("*", cors()); // Handle preflight requests for all routes

// Log incoming requests to verify CORS middleware is applied
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Log incoming requests to verify payload and CORS
app.use((req, res, next) => {
  console.log("Incoming request:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
});

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dietplans", dietPlanRoutes);
app.use("/api/workoutplans", workoutPlanRoutes);
app.use("/api/trainingschedules", trainingScheduleRoutes);
app.use("/api/referral", referralRoutes);

const PORT = 8080; // Changed port to 8080 to avoid conflicts with the frontend
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
