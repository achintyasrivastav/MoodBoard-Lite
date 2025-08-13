import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    if (res.success) nav("/today");
    else setError(res.error);
  };

  return (
    <div className="min-h-[80vh] grid place-items-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <h2 className="text-xl text-slate-200 font-semibold">Create account</h2>
        {error && <div className="rounded-lg bg-rose-600/20 border border-rose-700 text-rose-200 px-3 py-2">{error}</div>}
        <input className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200"
               placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200"
               type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200"
               type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2">Sign up</button>
        <p className="text-sm text-slate-400">
          Already have an account? <Link className="text-indigo-400 hover:underline" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
