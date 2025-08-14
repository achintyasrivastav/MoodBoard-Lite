import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import api from "../api/api"
import MoodForm from "../components/MoodForm"

export default function CreateMood() {
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const { theme } = useTheme()
  const nav = useNavigate()

  const handleSubmit = async (payload) => {
    setError("")
    setSaving(true)
    try {
      await api.post("/api/mood", payload)
      setSuccess(true)
      setTimeout(() => nav("/timeline"), 1500)
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to create MoodBoard")
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${theme.primary} p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto pt-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>Create New Mood</h1>
          <p className={`${theme.textSecondary} text-lg`}>Capture how you're feeling right now</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <MoodForm onSubmit={handleSubmit} />
        </motion.div>

        <AnimatePresence>
          {saving && (
            <motion.div
              className={`fixed bottom-8 right-8 ${theme.card} backdrop-blur-lg ${theme.border} border rounded-full px-6 py-3 flex items-center space-x-3`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.div
                className={`w-4 h-4 border-2 ${theme.text.replace("text-", "border-")} border-t-transparent rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <span className={`${theme.text} font-medium`}>Saving your mood...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={`${theme.card} backdrop-blur-lg ${theme.border} border rounded-2xl p-8 text-center`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                >
                  ✨
                </motion.div>
                <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>Mood Saved!</h3>
                <p className={theme.textSecondary}>Redirecting to timeline...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
