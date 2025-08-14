import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Navigation() {
  const { user, logout } = useAuth()
  const { theme, changeTheme, themes } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const nav = useNavigate()

  const link = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? `${theme.card} ${theme.text} shadow-md scale-105`
        : `${theme.textSecondary} hover:${theme.text} hover:${theme.card} hover:scale-105`
    }`

  return (
    <nav
      className={`sticky top-0 z-40 ${theme.border} border-b bg-gradient-to-r ${theme.secondary}/80 backdrop-blur-xl transition-all duration-300`}
    >
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center gap-2 cursor-default"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="text-2xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🎭
            </motion.span>
            <motion.span
              className={`bg-gradient-to-r ${theme.accent.replace("bg-", "from-")} to-purple-400 bg-clip-text text-transparent font-bold text-xl tracking-wide`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              MoodBoard
            </motion.span>
            <motion.div
              className="flex gap-1"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-1 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              />
              <motion.div
                className="w-1 h-1 bg-blue-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              />
              <motion.div
                className="w-1 h-1 bg-pink-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
              />
            </motion.div>
          </motion.div>

          {user && (
            <>
              <NavLink to="/today" className={link}>
                Today
              </NavLink>
              <NavLink to="/create" className={link}>
                Create
              </NavLink>
              <NavLink to="/history" className={link}>
                History
              </NavLink>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className={`p-2 rounded-lg ${theme.card} ${theme.text} hover:${theme.button.replace("bg-", "hover:bg-")} transition-all duration-200`}
            >
              🎨
            </motion.button>
            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute right-0 mt-2 w-48 ${theme.card} backdrop-blur-xl ${theme.border} border rounded-lg shadow-xl z-50`}
                >
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <motion.button
                      key={key}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        changeTheme(key)
                        setShowThemeMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:${theme.button.replace("bg-", "hover:bg-")} transition-all duration-200 first:rounded-t-lg last:rounded-b-lg`}
                    >
                      <div className="flex gap-1">
                        {themeOption.colors.map((color, i) => (
                          <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className={theme.text}>{themeOption.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!user ? (
            <>
              <NavLink to="/login" className={link}>
                Login
              </NavLink>
              <NavLink to="/signup" className={link}>
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <span
                className={`hidden sm:block text-xs ${theme.textSecondary} mr-2 hover:${theme.text} transition-colors`}
              >
                👋 Hi, {user.name || user.email}
              </span>
              <button
                className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-sm hover:scale-105 active:scale-95 focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all duration-200 font-medium"
                onClick={() => {
                  logout()
                  nav("/login")
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
