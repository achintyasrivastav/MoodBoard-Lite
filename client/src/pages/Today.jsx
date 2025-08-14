import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import api from "../api/api"
import MoodCard from "../components/MoodCard"
import { Link } from "react-router-dom"

export default function Today() {
  const [mood, setMood] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/api/mood/today")
      .then(({ data }) => setMood(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      className="mx-auto max-w-3xl p-4 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl text-slate-200 font-semibold">🌅 Today</h2>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <span>Loading your mood...</span>
            </div>
          </motion.div>
        ) : mood ? (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MoodCard mood={mood} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center space-y-3 hover:border-slate-700 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="text-4xl"
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              🎭
            </motion.div>
            <p className="text-slate-300">No mood entry yet for today</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-colors"
                to="/create"
              >
                ✨ Create your first mood
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
