import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Today from "./pages/Today";
import CreateMood from "./pages/CreateMood";
import HistoryPage from "./pages/HistoryPage";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="today" element={<Today />} />
              <Route path="create" element={<CreateMood />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
