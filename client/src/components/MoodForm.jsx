import { useState } from "react";

const EMOJIS = ["😊","😢","😡","😴","🤔","😍","😎","🤗","😰","🤯","🥳","😭","😇"];
const COLORS = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#85C1E9","#F8C471"];

export default function MoodForm({ onSubmit, initial }) {
  const [emojis, setEmojis] = useState(initial?.emojis || []);
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [color, setColor] = useState(initial?.color || COLORS[0]);
  const [note, setNote] = useState(initial?.note || "");

  const addEmoji = (e) => setEmojis(arr => [...arr, e]);
  const removeEmoji = (i) => setEmojis(arr => arr.filter((_, idx) => idx !== i));

  const submit = (e) => {
    e.preventDefault();
    if (!emojis.length) return;
    onSubmit({ emojis, imageUrl, color, note });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-5">
      <div>
        <label className="block text-sm text-slate-400 mb-2">Pick emojis (at least one)</label>
        <div className="flex flex-wrap gap-2">
          {emojis.map((emj, i) => (
            <button
              key={i}
              type="button"
              className="px-2 py-1 rounded-full text-lg bg-slate-800 text-slate-200 border border-slate-700"
              onClick={() => removeEmoji(i)}
              title="Remove"
            >
              {emj} <span className="ml-1 text-slate-400">&times;</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => addEmoji(e)}
              className="text-2xl hover:scale-110 transition"
              title="Add"
            >{e}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full ring-2 ${c===color ? "ring-white" : "ring-slate-700"}`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-2">Image/GIF URL (optional)</label>
        <input
          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 placeholder:text-slate-500"
          placeholder="https://…"
          value={imageUrl}
          onChange={(e)=>setImageUrl(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-2">Note (≤ 200 chars)</label>
        <textarea
          rows={4}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 placeholder:text-slate-500"
          value={note}
          maxLength={200}
          onChange={(e)=>setNote(e.target.value)}
          placeholder="How are you feeling today?"
        />
      </div>

      <button
        type="submit"
        disabled={!emojis.length}
        className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
      >
        Save Mood
      </button>
    </form>
  );
}
