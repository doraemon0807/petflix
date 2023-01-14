import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BigInfo from "./Components/BigInfo";
import GridComponent from "./Components/GridComponent";
import ErrorPage from "./Routes/ErrorPage";
import Movies from "./Routes/Movies";
import Search from "./Routes/Search";
import TvShows from "./Routes/TvShows";

export const URL =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

const router = createBrowserRouter([
  {
    path: `${URL}`,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Movies />,
      },
      {
        path: "movies",
        element: <Movies />,
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
            path: "topRated/:showId",
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
        element: <TvShows />,
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
          {
            path: "airingToday/:showId",
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
            element: <GridComponent />,
            children: [
              {
                path: ":showId",
                element: <BigInfo />,
              },
            ],
          },
          {
            path: "tv",
            element: <GridComponent />,
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
