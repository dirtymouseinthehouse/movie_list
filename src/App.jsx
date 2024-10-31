import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { CssBaseline } from "@mui/material";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import SearchResultsPage from "./pages/SearchResultsPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

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
      {
        path: "/movie/details/:id",
        element: <MovieDetailsPage />,
      },
      // {
      //   path: "/tvshows/details/:id",
      //   element: <DetailsPage />,
      // },
      {
        path: "/results/:title",
        element: <SearchResultsPage />,
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
