import LayoutWrapper from "@/layouts/LayoutWrapper";
import Category from "@/pages/Category";
import Discover from "@/pages/Discover";
import Favorite from "@/pages/Favorite";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Podcast from "@/pages/Podcast";
import Saved from "@/pages/Saved";
import { createBrowserRouter, Outlet } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    element: <LayoutWrapper />,
    children: [
      {
        path: "/podcasts",
        element: <Outlet />,
        children: [
          { index: true, element: <Home /> },
          { path: "podcast/:id", element: <Podcast /> },
        ],
      },
      {
        path: "discover",
        element: <Outlet />,
        children: [
          { index: true, element: <Discover /> },
          { path: "category/:id", element: <Category /> },
        ],
      },
      { path: "/saved", element: <Saved /> },
      { path: "/favorites", element: <Favorite /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
export default routes;
