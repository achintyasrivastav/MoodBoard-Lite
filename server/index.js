import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import cors from "cors"; // Import the cors package

dotenv.config();
connectDB();

const app = express();

const allowList = (process.env.ALLOWED_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(s => s.trim());

const corsOptions = {
  origin: (origin, cb) => {
    // allow same-origin/SSR (no origin) and any match in allowList
    if (!origin || allowList.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
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
