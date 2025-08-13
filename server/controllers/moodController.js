import MoodBoard from "../models/MoodBoard.js";
import { todayYYYYMMDD } from "../utils/date.js";

// POST /api/mood
export const createMood = async (req, res) => {
    try {
        const { emojis, imageUrl, color, note } = req.body || {};
        if (!Array.isArray(emojis) || emojis.length === 0) {
            return res.status(400).json({ error: "At least one emoji is required" });
        }
        if (note && note.length > 200) {
            return res.status(400).json({ error: "Note must be ≤ 200 characters" });
        }

        const date = todayYYYYMMDD();
        const doc = await MoodBoard.create({
            user: req.user.id,
            date,
            emojis,
            imageUrl,
            color,
            note,
        });

        return res.status(201).json(doc);
    } 
    catch (err) {
        if (err?.code === 11000) {
            // unique index violation (duplicate user+date)
            return res.status(409).json({ error: "MoodBoard already exists for today" });
        }
        console.error(`createMood error: ${err.message}`);
        return res.status(500).json({ error: "Server error" });
    }
};

// GET /api/mood/today
export const getTodayMood = async (req, res) => {
    try {
        const date = todayYYYYMMDD();
        const doc = await MoodBoard.findOne({ user: req.user.id, date });
        return res.json(doc || null);
    } 
    catch (err) {
        console.error(`getTodayMood error: ${err.message}`);
        return res.status(500).json({ error: "Server error" });
    }
};

// GET /api/mood/history
export const getHistory = async (req, res) => {
    try {
        const list = await MoodBoard
            .find({ user: req.user.id })
            .sort({ date: -1, createdAt: -1 });
        return res.json(list);
    } catch (err) {
        console.error(`getHistory error: ${err.message}`);
        return res.status(500).json({ error: "Server error" });
    }
};
