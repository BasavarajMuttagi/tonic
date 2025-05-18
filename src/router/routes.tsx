import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "*", element: <NotFound /> },
]);
export default routes;
