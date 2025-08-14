import { motion } from "framer-motion"

export default function MoodCard({ mood }) {
  const when = new Date(mood.createdAt || mood.updatedAt || Date.now())

  return (
    <motion.div
      className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-black/30"
      whileHover={{
        y: -4,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        borderColor: "#475569",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-slate-200 font-semibold group-hover:text-white transition-colors">Mood</h3>
        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
          {when.toLocaleString()}
        </span>
      </div>

      {Array.isArray(mood.emojis) && mood.emojis.length > 0 && (
        <motion.div
          className="text-2xl mt-2"
          whileHover={{
            y: [-2, -6, -2],
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {mood.emojis.join(" ")}
        </motion.div>
      )}

      {mood.color && (
        <motion.div
          className="w-full h-2 rounded-full my-3"
          style={{ backgroundColor: mood.color }}
          whileHover={{ height: 12 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            height: { duration: 0.3 },
            opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
      )}

      {mood.imageUrl && (
        <motion.img
          src={mood.imageUrl || "/placeholder.svg"}
          alt="mood"
          className="w-full h-44 object-cover rounded-xl ring-1 ring-slate-800"
          whileHover={{
            scale: 1.02,
            ringWidth: 2,
            ringColor: "#64748b",
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {mood.note && (
        <p className="text-sm text-slate-300 mt-3 leading-relaxed group-hover:text-slate-200 transition-colors">
          {mood.note}
        </p>
      )}
    </motion.div>
  )
}
