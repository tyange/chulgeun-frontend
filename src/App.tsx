import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import GoogleAuthPage from "@/pages/GoogleAuthPage";
import MainPage from "@/pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/google/callback" element={<GoogleAuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}
