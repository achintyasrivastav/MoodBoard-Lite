import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export default function Popup({ isOpen, onClose, type = "success", message, duration = 3000 }) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, duration])

  const popupConfig = {
    success: {
      icon: "✨",
      bgColor: "from-green-500 to-emerald-500",
      borderColor: "border-green-400",
    },
    error: {
      icon: "⚠️",
      bgColor: "from-red-500 to-rose-500",
      borderColor: "border-red-400",
    },
    info: {
      icon: "ℹ️",
      bgColor: "from-blue-500 to-indigo-500",
      borderColor: "border-blue-400",
    },
  }

  const config = popupConfig[type] || popupConfig.success

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className={`relative bg-gradient-to-r ${config.bgColor} text-white rounded-2xl p-6 shadow-2xl border ${config.borderColor} max-w-sm w-full mx-4`}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.span
                className="text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 20 }}
              >
                {config.icon}
              </motion.span>
              <motion.p
                className="font-medium text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>
            </div>

            {/* Progress bar */}
            {duration > 0 && (
              <motion.div
                className="h-1 bg-white/30 rounded-full overflow-hidden mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                />
              </motion.div>
            )}

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
