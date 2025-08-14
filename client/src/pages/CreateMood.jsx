import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import MoodForm from "../components/MoodForm"

export default function CreateMood() {
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (payload) => {
    setError("")
    setSaving(true)
    try {
      await api.post("/api/mood", payload)
      nav("/timeline")
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to create MoodBoard")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4 animate-fade-in">
      <h2 className="text-xl text-slate-200 font-semibold">✨ New Mood</h2>
      {error && (
        <div className="rounded-lg bg-rose-600/20 border border-rose-700 text-rose-200 px-3 py-2 animate-shake">
          {error}
        </div>
      )}
      <MoodForm onSubmit={handleSubmit} />
      {saving && (
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-indigo-500 border-t-transparent"></div>
          <span>Saving your mood...</span>
        </div>
      )}
    </div>
  )
}
