import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createMood, getTodayMood, getHistory } from "../controllers/moodController.js";

const router = Router();

router.post("/", auth, createMood);          // POST /api/mood
router.get("/today", auth, getTodayMood);    // GET  /api/mood/today
router.get("/history", auth, getHistory);    // GET  /api/mood/history

export default router;
