import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { useState, useEffect } from "react"

const generateBubbles = (color, palette) => {
  const bubbles = []
  const bubbleCount = 8 + Math.floor(Math.random() * 4) // 8-12 bubbles

  // Use palette colors if available, otherwise generate variations of the main color
  const colors = palette ? palette : [color]

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      id: i,
      size: Math.random() * 20 + 10, // 10-30px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2, // 3-5 seconds
    })
  }
  return bubbles
}

export default function MoodCard({ mood }) {
  const { theme } = useTheme()
  const [bubbles, setBubbles] = useState([])
  const [showBubbles, setShowBubbles] = useState(false)
  const when = new Date(mood.createdAt || mood.updatedAt || Date.now())

  useEffect(() => {
    if (mood.color) {
      const palette = mood.palette ? theme.colors : null
      setBubbles(generateBubbles(mood.color, palette))
    }
  }, [mood.color, mood.palette, theme.colors])

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl ${theme.border} border ${theme.card} backdrop-blur-lg p-4 shadow-lg`}
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setShowBubbles(true)}
      onHoverEnd={() => setShowBubbles(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full opacity-0"
            style={{
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
            }}
            animate={
              showBubbles
                ? {
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1.2, 0.8],
                    y: [-20, -40, -60],
                    rotate: [0, 180, 360],
                  }
                : {
                    opacity: 0,
                    scale: 0.5,
                  }
            }
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: showBubbles ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {mood.color && (
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: mood.color }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className={`${theme.text} font-semibold group-hover:scale-105 transition-all duration-200`}>Mood</h3>
          <span className={`text-xs ${theme.textSecondary} group-hover:${theme.text} transition-colors`}>
            {when.toLocaleString()}
          </span>
        </div>

        {Array.isArray(mood.emojis) && mood.emojis.length > 0 && (
          <motion.div
            className="text-2xl mt-2"
            whileHover={{
              y: [-2, -6, -2],
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {mood.emojis.join(" ")}
          </motion.div>
        )}

        {mood.color && (
          <motion.div
            className="relative w-full h-3 rounded-full my-3 overflow-hidden"
            style={{ backgroundColor: mood.color }}
            whileHover={{ height: 16 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        )}

        {mood.imageUrl && (
          <motion.div
            className="relative overflow-hidden rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={mood.imageUrl || "/placeholder.svg"}
              alt="mood"
              className={`w-full h-44 object-cover ${theme.border} ring-1`}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              whileHover={{
                translateX: "100%",
                transition: { duration: 0.6, ease: "easeInOut" },
              }}
            />
          </motion.div>
        )}

        {mood.note && (
          <motion.p
            className={`text-sm ${theme.textSecondary} mt-3 leading-relaxed group-hover:${theme.text} transition-colors`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {mood.note}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
