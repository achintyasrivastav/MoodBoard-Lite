import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import GifPicker from "./GifPicker"
import Popup from "./Popup"

const EMOJIS = ["😊", "😢", "😡", "😴", "🤔", "😍", "😎", "🤗", "😰", "🤯", "🥳", "😭", "😇"]

const COLOR_PALETTES = {
  happy: {
    name: "Happy",
    colors: ["#FFD93D", "#6BCF7F", "#4D96FF", "#9B59B6", "#FF6B6B"],
    emoji: "😊",
  },
  calm: {
    name: "Calm",
    colors: ["#74B9FF", "#81ECEC", "#A29BFE", "#6C5CE7", "#00B894"],
    emoji: "😌",
  },
  energetic: {
    name: "Energetic",
    colors: ["#FF7675", "#FD79A8", "#FDCB6E", "#E17055", "#00CEC9"],
    emoji: "⚡",
  },
  dreamy: {
    name: "Dreamy",
    colors: ["#DDA0DD", "#FFB6C1", "#E6E6FA", "#F0E68C", "#98FB98"],
    emoji: "✨",
  },
  mysterious: {
    name: "Mysterious",
    colors: ["#2D3436", "#636E72", "#6C5CE7", "#A29BFE", "#74B9FF"],
    emoji: "🌙",
  },
  warm: {
    name: "Warm",
    colors: ["#E17055", "#FDCB6E", "#E84393", "#FD79A8", "#FF7675"],
    emoji: "🔥",
  },
}

export default function MoodForm({ onSubmit, initial }) {
  const [emojis, setEmojis] = useState(initial?.emojis || [])
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "")
  const [color, setColor] = useState(initial?.color || COLOR_PALETTES.happy.colors[0])
  const [selectedPalette, setSelectedPalette] = useState("happy")
  const [note, setNote] = useState(initial?.note || "")
  const [showGifPicker, setShowGifPicker] = useState(false)
  const [popup, setPopup] = useState({ isOpen: false, type: "success", message: "" })
  const { theme } = useTheme()

  const addEmoji = (e) => setEmojis((arr) => [...arr, e])
  const removeEmoji = (i) => setEmojis((arr) => arr.filter((_, idx) => idx !== i))

  const submit = async (e) => {
    e.preventDefault()
    if (!emojis.length) {
      setPopup({ isOpen: true, type: "error", message: "Please select at least one emoji!" })
      return
    }

    try {
      await onSubmit({ emojis, imageUrl, color, note, palette: selectedPalette })
      setPopup({ isOpen: true, type: "success", message: "Mood created successfully! ✨" })

      setEmojis([])
      setImageUrl("")
      setNote("")
      setColor(COLOR_PALETTES.happy.colors[0])
      setSelectedPalette("happy")
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!"
      const isAlreadyExists = message.toLowerCase().includes("already") || message.toLowerCase().includes("exists")
      setPopup({
        isOpen: true,
        type: isAlreadyExists ? "info" : "error",
        message: isAlreadyExists ? "You've already created a mood today! 🎭" : message,
      })
    }
  }

  const handleGifSelect = (gifUrl) => {
    setImageUrl(gifUrl)
  }

  return (
    <>
      <motion.form
        onSubmit={submit}
        className={`rounded-2xl ${theme.border} border ${theme.card} backdrop-blur-lg p-6 space-y-6 hover:${theme.border.replace("border-", "hover:border-")} transition-all duration-300 shadow-xl`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <label className={`block text-sm ${theme.textSecondary} mb-3 font-medium`}>Pick emojis (at least one)</label>
          <div className="flex flex-wrap gap-2 mb-4">
            <AnimatePresence>
              {emojis.map((emj, i) => (
                <motion.button
                  key={i}
                  type="button"
                  className={`px-3 py-2 rounded-full text-lg ${theme.card} ${theme.text} ${theme.border} border hover:scale-105 focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200`}
                  onClick={() => removeEmoji(i)}
                  title="Remove"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {emj} <span className={`ml-1 ${theme.textSecondary}`}>&times;</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((e, index) => (
              <motion.button
                key={e}
                type="button"
                onClick={() => addEmoji(e)}
                className={`text-2xl p-2 rounded-lg hover:${theme.card} transition-all duration-200`}
                title="Add"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.3, rotate: 12 }}
                whileTap={{ scale: 0.9 }}
              >
                {e}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <label className={`block text-sm ${theme.textSecondary} mb-3 font-medium`}>Choose a mood palette</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedPalette(key)
                  setColor(palette.colors[0])
                }}
                className={`p-3 rounded-xl ${theme.border} border transition-all duration-200 ${
                  selectedPalette === key
                    ? `${theme.button} ring-2 ring-opacity-50 scale-105`
                    : `${theme.card} hover:scale-105`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{palette.emoji}</span>
                  <span className={`text-sm font-medium ${theme.text}`}>{palette.name}</span>
                </div>
                <div className="flex gap-1">
                  {palette.colors.map((c, i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: c }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    />
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {COLOR_PALETTES[selectedPalette].colors.map((c, index) => (
              <motion.button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ring-2 transition-all duration-200 ${
                  c === color
                    ? "ring-white scale-110 shadow-lg"
                    : `${theme.border.replace("border-", "ring-")} hover:scale-110`
                }`}
                style={{ backgroundColor: c }}
                title={c}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <label className={`block text-sm ${theme.textSecondary} mb-3 font-medium`}>Image/GIF</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                className={`flex-1 rounded-xl ${theme.input} px-3 py-2 placeholder:${theme.textSecondary} focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200`}
                placeholder="Paste URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <motion.button
                type="button"
                onClick={() => setShowGifPicker(true)}
                className={`px-4 py-2 rounded-xl ${theme.button} ${theme.text} font-medium transition-all duration-200 flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🎬</span>
                <span className="hidden sm:inline">GIFs</span>
              </motion.button>
            </div>

            {imageUrl && (
              <motion.div
                className="relative rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Selected media"
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.src = "/broken-image.png"
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <label className={`block text-sm ${theme.textSecondary} mb-3 font-medium`}>Note (≤ 200 chars)</label>
          <textarea
            rows={4}
            className={`w-full rounded-xl ${theme.input} px-3 py-2 placeholder:${theme.textSecondary} focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200 resize-none`}
            value={note}
            maxLength={200}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling today?"
          />
          <div className={`text-xs ${theme.textSecondary} mt-1 text-right`}>{note.length}/200</div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={!emojis.length}
          className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl ${theme.button} ${theme.text} disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200 font-medium shadow-lg`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ✨ Save Mood
        </motion.button>
      </motion.form>

      <GifPicker isOpen={showGifPicker} onClose={() => setShowGifPicker(false)} onSelectGif={handleGifSelect} />

      <Popup
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        type={popup.type}
        message={popup.message}
      />
    </>
  )
}
