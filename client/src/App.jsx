import "./index.css";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Navigation />    {/* ← only place where the navbar is rendered */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
