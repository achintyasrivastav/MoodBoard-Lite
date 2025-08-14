import "./index.css"
import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"
import { ThemeProvider, useTheme } from "./context/ThemeContext"

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={`App min-h-screen bg-gradient-to-br ${theme.primary}`}>
      <Navigation />
      <main className="main-content pt-4 pb-8">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
