export default function MoodCard({ mood }) {
  const when = new Date(mood.createdAt || mood.updatedAt || Date.now());
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-200 font-semibold">Mood</h3>
        <span className="text-xs text-slate-400">{when.toLocaleString()}</span>
      </div>

      {Array.isArray(mood.emojis) && mood.emojis.length > 0 && (
        <div className="text-2xl mt-2">{mood.emojis.join(" ")}</div>
      )}

      {mood.color && (
        <div className="w-full h-2 rounded-full my-3" style={{ backgroundColor: mood.color }} />
      )}

      {mood.imageUrl && (
        <img
          src={mood.imageUrl}
          alt="mood"
          className="w-full h-44 object-cover rounded-xl ring-1 ring-slate-800"
        />
      )}

      {mood.note && (
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">{mood.note}</p>
      )}
    </div>
  );
}
