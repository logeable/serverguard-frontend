import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./containers/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import InternalErrorPage from "./pages/InternalErrorPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFoundPage />}></Route>
      <Route path="/500" element={<InternalErrorPage />}></Route>
      <Route path="*" element={<Navigate to="/404" />}></Route>
    </Routes>
  );
}

export default App;
