import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Auth routes
app.use("/api/auth", authRoutes);

//MoodBoard routes
app.use("/api/mood", moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
