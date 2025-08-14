import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await login(email, password)
    if (res.success) nav("/today")
    else setError(res.error)
    setLoading(false)
  }

  return (
    <motion.div
      className="min-h-[80vh] grid place-items-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl"
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          borderColor: "#475569",
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2
          className="text-xl text-slate-200 font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🔐 Welcome Back
        </motion.h2>

        <AnimatePresence>
          {error && (
            <motion.div
              className="rounded-lg bg-rose-600/20 border border-rose-700 text-rose-200 px-3 py-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: [0, -4, 4, -4, 4, 0],
              }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                opacity: { duration: 0.3 },
                x: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm text-slate-400 font-medium">Email</label>
          <motion.input
            type="email"
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            required
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm text-slate-400 font-medium">Password</label>
          <motion.input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            required
          />
        </motion.div>

        <motion.button
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <span>Signing in...</span>
              </motion.div>
            ) : (
              <motion.span key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Sign in
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.p
          className="text-sm text-slate-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          New here?{" "}
          <Link className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors" to="/signup">
            Create an account
          </Link>
        </motion.p>
      </motion.form>
    </motion.div>
  )
}
