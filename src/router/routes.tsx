import AppHeader from "@/components/AppHeader";
import MainLayout from "@/layouts/MainLayout";
import Discover from "@/pages/Discover";
import Favorite from "@/pages/Favorite";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Saved from "@/pages/Saved";
import { createBrowserRouter, Outlet } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    element: (
      <MainLayout>
        <MainLayout.Header>
          <AppHeader />
        </MainLayout.Header>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/discover", element: <Discover /> },
      { path: "/saved", element: <Saved /> },
      { path: "/favorites", element: <Favorite /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
export default routes;
