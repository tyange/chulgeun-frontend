import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "@/routes/AuthRoute";
import MainRoute from "@/routes/MainRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute />,
  },
  {
    path: "/main",
    element: <MainRoute />,
  },
]);
