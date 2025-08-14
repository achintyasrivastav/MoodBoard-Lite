import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const themes = {
  midnight: {
    name: "Midnight",
    primary: "from-slate-950 via-slate-900 to-slate-950",
    secondary: "from-slate-800 to-slate-900",
    accent: "bg-indigo-600",
    text: "text-white",
    textSecondary: "text-slate-300",
    card: "bg-slate-800/50",
    border: "border-slate-700",
    button: "bg-indigo-600 hover:bg-indigo-700",
    input: "bg-slate-800 border-slate-700 text-white",
    colors: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
  },
  ocean: {
    name: "Ocean",
    primary: "from-blue-950 via-cyan-900 to-teal-950",
    secondary: "from-blue-800 to-cyan-900",
    accent: "bg-cyan-500",
    text: "text-white",
    textSecondary: "text-cyan-200",
    card: "bg-blue-800/50",
    border: "border-cyan-700",
    button: "bg-cyan-500 hover:bg-cyan-600",
    input: "bg-blue-800 border-cyan-700 text-white",
    colors: ["#06b6d4", "#0891b2", "#0e7490", "#155e75"],
  },
  sunset: {
    name: "Sunset",
    primary: "from-orange-950 via-red-900 to-pink-950",
    secondary: "from-orange-800 to-red-900",
    accent: "bg-orange-500",
    text: "text-white",
    textSecondary: "text-orange-200",
    card: "bg-orange-800/50",
    border: "border-orange-700",
    button: "bg-orange-500 hover:bg-orange-600",
    input: "bg-orange-800 border-orange-700 text-white",
    colors: ["#f97316", "#ea580c", "#dc2626", "#be185d"],
  },
  forest: {
    name: "Forest",
    primary: "from-green-950 via-emerald-900 to-teal-950",
    secondary: "from-green-800 to-emerald-900",
    accent: "bg-emerald-500",
    text: "text-white",
    textSecondary: "text-emerald-200",
    card: "bg-green-800/50",
    border: "border-emerald-700",
    button: "bg-emerald-500 hover:bg-emerald-600",
    input: "bg-green-800 border-emerald-700 text-white",
    colors: ["#10b981", "#059669", "#047857", "#065f46"],
  },
  lavender: {
    name: "Lavender",
    primary: "from-purple-950 via-violet-900 to-fuchsia-950",
    secondary: "from-purple-800 to-violet-900",
    accent: "bg-violet-500",
    text: "text-white",
    textSecondary: "text-violet-200",
    card: "bg-purple-800/50",
    border: "border-violet-700",
    button: "bg-violet-500 hover:bg-violet-600",
    input: "bg-purple-800 border-violet-700 text-white",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"],
  },
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("midnight")

  useEffect(() => {
    const savedTheme = localStorage.getItem("moodboard-theme")
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName)
    localStorage.setItem("moodboard-theme", themeName)
  }

  const theme = themes[currentTheme]

  return <ThemeContext.Provider value={{ currentTheme, theme, changeTheme, themes }}>{children}</ThemeContext.Provider>
}
