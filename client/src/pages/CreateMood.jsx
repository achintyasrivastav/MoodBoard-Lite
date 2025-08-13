import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import MoodForm from "../components/MoodForm";

export default function CreateMood() {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (payload) => {
    setError("");
    setSaving(true);
    try {
      await api.post("/api/mood", payload);
      nav("/timeline");
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to create MoodBoard");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4">
      <h2 className="text-xl text-slate-200 font-semibold">New Mood</h2>
      {error && <div className="rounded-lg bg-rose-600/20 border border-rose-700 text-rose-200 px-3 py-2">{error}</div>}
      <MoodForm onSubmit={handleSubmit} />
      {saving && <p className="text-xs text-slate-400">Saving…</p>}
    </div>
  );
}
