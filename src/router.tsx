import { createBrowserRouter } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import MainPage from "@/pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
]);
