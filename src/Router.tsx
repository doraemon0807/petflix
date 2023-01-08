import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BigInfo from "./Components/BigInfo";
import MovieInfo from "./Components/BigInfo";
import Home from "./Routes/Movies";
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
        path: "movies",
        element: <Home />,
        children: [
          {
            path: "nowPlaying/:showId",
            element: <BigInfo />,
          },
          {
            path: "popular/:showId",
            element: <BigInfo />,
          },
          {
            path: "upcoming/:showId",
            element: <BigInfo />,
          },
        ],
      },

      {
        path: "tv",
        element: <Tv />,
        children: [
          {
            path: "onAir/:showId",
            element: <BigInfo />,
          },
          {
            path: "popular/:showId",
            element: <BigInfo />,
          },
          {
            path: "topRated/:showId",
            element: <BigInfo />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: "movies",
            element: <Search />,
            children: [
              {
                path: ":showId",
                element: <BigInfo />,
              },
            ],
          },
          {
            path: "tv",
            element: <Search />,
            children: [
              {
                path: ":showId",
                element: <BigInfo />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
