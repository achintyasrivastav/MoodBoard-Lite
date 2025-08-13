import { useEffect, useState } from "react";
import api from "../api/api";
import MoodCard from "../components/MoodCard";

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/mood/history")
      .then(({ data }) => setItems(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <h2 className="text-xl text-slate-200 font-semibold">History</h2>
      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No MoodBoards yet. Start creating today!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => <MoodCard key={m._id} mood={m} />)}
        </div>
      )}
    </div>
  );
}
