import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import api from "../api/api"

// helpers
const fmtDay = (yyyyMMdd) =>
  new Date(yyyyMMdd + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
const fmtTime = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })

export default function HistoryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    api
      .get("/api/mood/history")
      .then(({ data }) => setItems(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  // group by normalized date and filter by search term
  const groups = useMemo(() => {
    const filteredItems = items.filter(
      (item) =>
        !searchTerm ||
        item.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.emojis?.join("").includes(searchTerm),
    )

    const map = new Map()
    for (const m of filteredItems) {
      const key = m.date
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(m)
    }
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? 1 : -1))
  }, [items, searchTerm])

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
            <motion.div
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-white/70">Loading your mood history...</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4"
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
          <h1 className="text-4xl font-bold text-white mb-2">Mood History</h1>
          <p className="text-white/70 text-lg">Your emotional journey over time</p>
        </motion.div>

        {groups.length === 0 ? (
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchTerm ? "No matching moods found" : "No moods yet"}
            </h3>
            <p className="text-white/70">
              {searchTerm ? "Try a different search term" : "Start creating your first mood today!"}
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-indigo-400 opacity-30" />

            <AnimatePresence>
              {groups.map(([day, moods], groupIndex) => (
                <motion.div
                  key={day}
                  className="relative mb-12"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  {/* Date Badge */}
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: groupIndex * 0.1 + 0.2, type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                      {fmtDay(day)}
                    </div>
                  </motion.div>

                  <div className="space-y-8">
                    {moods.map((mood, moodIndex) => {
                      const isLeft = moodIndex % 2 === 0
                      return (
                        <motion.div
                          key={mood._id}
                          className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-start ${
                            isLeft ? "" : "md:[&>*:first-child]:order-2"
                          }`}
                          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: groupIndex * 0.1 + moodIndex * 0.1 + 0.3 }}
                        >
                          {/* Timeline dot */}
                          <motion.div
                            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10"
                            style={{ backgroundColor: mood.color || "#8b5cf6" }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: groupIndex * 0.1 + moodIndex * 0.1 + 0.4,
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />

                          {/* Mood Card */}
                          <motion.article
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          >
                            <header className="flex items-center justify-between mb-4">
                              <motion.div
                                className="text-3xl"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                {Array.isArray(mood.emojis) ? mood.emojis.join(" ") : "😊"}
                              </motion.div>
                              <time className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full">
                                {fmtTime(mood.createdAt || mood.updatedAt)}
                              </time>
                            </header>

                            {mood.color && (
                              <motion.div
                                className="h-2 w-full rounded-full mb-4 shadow-inner"
                                style={{ backgroundColor: mood.color }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: groupIndex * 0.1 + moodIndex * 0.1 + 0.5 }}
                              />
                            )}

                            {mood.imageUrl && (
                              <motion.img
                                src={mood.imageUrl}
                                alt="mood"
                                className="mb-4 h-48 w-full rounded-xl object-cover shadow-lg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: groupIndex * 0.1 + moodIndex * 0.1 + 0.6 }}
                              />
                            )}

                            {mood.note && (
                              <motion.p
                                className="text-white/80 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: groupIndex * 0.1 + moodIndex * 0.1 + 0.7 }}
                              >
                                {mood.note}
                              </motion.p>
                            )}
                          </motion.article>

                          {/* Spacer for alternating layout */}
                          <div className="hidden md:block" />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}
