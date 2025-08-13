import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-[40vh] grid place-items-center text-slate-300">Loading…</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
