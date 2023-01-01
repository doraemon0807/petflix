import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

export const URL =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

const router = createBrowserRouter([
  {
    path: `${URL}`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
