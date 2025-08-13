import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function decodeJwt(token) {
  try {
    const json = atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(Array.from(json).map(c=>"%"+c.charCodeAt(0).toString(16).padStart(2,"0")).join("")));
  } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      const p = decodeJwt(t);
      if (p) setUser({ id: p.id, name: p.name, email: p.email });
      else localStorage.removeItem("token");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.error || "Login failed" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post("/api/auth/signup", { name, email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.error || "Signup failed" };
    }
  };

  const logout = () => { localStorage.removeItem("token"); setUser(null); };

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
