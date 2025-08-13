import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const link = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 font-semibold">MoodBoard</span>
          {user && (
            <>
              <NavLink to="/today" className={link}>Today</NavLink>
              <NavLink to="/create" className={link}>Create</NavLink>
              <NavLink to="/history" className={link}>History</NavLink>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/login" className={link}>Login</NavLink>
              <NavLink to="/signup" className={link}>Signup</NavLink>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-xs text-slate-400 mr-2">Hi, {user.name || user.email}</span>
              <button
                className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm"
                onClick={() => { logout(); nav("/login"); }}
              >Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
