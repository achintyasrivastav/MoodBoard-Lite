import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import cors from "cors"; // Import the cors package

dotenv.config();
connectDB();

const app = express();

// Enable CORS
const corsOptions = {
  origin: "http://localhost:5173", // Allow only requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, headers, etc.)
};
app.use(cors(corsOptions));

app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Auth routes
app.use("/api/auth", authRoutes);

// MoodBoard routes
app.use("/api/mood", moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


