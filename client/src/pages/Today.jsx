import { useEffect, useState } from "react";
import api from "../api/api";
import MoodCard from "../components/MoodCard";
import { Link } from "react-router-dom";

export default function Today() {
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/mood/today")
      .then(({ data }) => setMood(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4">
      <h2 className="text-xl text-slate-200 font-semibold">Today</h2>
      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">Loading…</div>
      ) : mood ? (
        <MoodCard mood={mood} />
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No entry yet. <Link className="text-indigo-400 hover:underline" to="/create">Create one</Link>
        </div>
      )}
    </div>
  );
}
