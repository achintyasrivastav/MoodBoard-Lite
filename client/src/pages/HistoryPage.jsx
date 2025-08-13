import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

// helpers
const fmtDay = (yyyyMMdd) =>
  new Date(yyyyMMdd + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/mood/history") // backend route: GET /api/mood/history
      .then(({ data }) => setItems(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  // group by normalized date (backend returns YYYY-MM-DD per entry)
  const groups = useMemo(() => {
    const map = new Map();
    for (const m of items) {
      const key = m.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(m);
    }
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? 1 : -1));
  }, [items]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">Loading…</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="text-xl text-slate-200 font-semibold mb-6">History</h2>

      {groups.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No MoodBoards yet. Start creating today!
        </div>
      ) : (
        <div className="relative">
          {/* center line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-slate-800" aria-hidden />

          <ol className="space-y-10">
            {groups.map(([day, moods]) => (
              <li key={day} className="relative">
                {/* date badge */}
                <div className="sticky top-16 z-10 mb-6 flex justify-center">
                  <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300 shadow">
                    {fmtDay(day)}
                  </span>
                </div>

                <ul className="space-y-10">
                  {moods.map((m, idx) => {
                    const isLeft = idx % 2 === 0;
                    return (
                      <li
                        key={m._id}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-start ${
                          isLeft ? "" : "md:[&>*:first-child]:order-2"
                        }`}
                      >
                        {/* connector dot */}
                        <div
                          className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-3 h-3 w-3 rounded-full ring-2 ring-slate-900"
                          style={{ backgroundColor: m.color || "#64748b" }}
                          aria-hidden
                        />

                        {/* card */}
                        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow">
                          <header className="mb-2 flex items-center justify-between">
                            <div className="text-2xl">
                              {Array.isArray(m.emojis) ? m.emojis.join(" ") : ""}
                            </div>
                            <time className="text-xs text-slate-400">
                              {fmtTime(m.createdAt || m.updatedAt)}
                            </time>
                          </header>

                          {m.color && (
                            <div
                              className="h-1.5 w-full rounded-full mb-3"
                              style={{ backgroundColor: m.color }}
                            />
                          )}

                          {m.imageUrl && (
                            <img
                              src={m.imageUrl}
                              alt="mood"
                              className="mb-3 h-40 w-full rounded-lg object-cover ring-1 ring-slate-800"
                            />
                          )}

                          {m.note && (
                            <p className="text-sm text-slate-300 leading-relaxed">{m.note}</p>
                          )}
                        </article>

                        {/* spacer column for alternating layout on md+ */}
                        <div className="hidden md:block" />
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
