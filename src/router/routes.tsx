import LayoutWrapper from "@/layouts/LayoutWrapper";
import Discover from "@/pages/Discover";
import Favorite from "@/pages/Favorite";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Saved from "@/pages/Saved";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    element: <LayoutWrapper />,
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
