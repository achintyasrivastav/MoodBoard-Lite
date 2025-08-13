import mongoose from "mongoose";

const moodBoardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      // YYYY-MM-DD
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    emojis: {
      type: [String],
      validate: v => Array.isArray(v) && v.length > 0,
      required: true,
    },
    imageUrl: { 
        type: String, 
        trim: true 
    },
    color: { 
        type: String, 
        trim: true 
    },
    note: { 
        type: String, 
        trim: true, 
        maxlength: 200 
    },
  },
  { timestamps: true }
);

// Enforce one board per user per day
moodBoardSchema.index({ user: 1, date: 1 }, { unique: true });

const MoodBoard = mongoose.model("MoodBoard", moodBoardSchema);
export default MoodBoard;