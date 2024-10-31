import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { CssBaseline } from "@mui/material";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <CssBaseline />
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
