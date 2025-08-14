import "./index.css"
import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <main className="main-content pt-4 pb-8">
        <Outlet />
      </main>
    </div>
  )
}
