import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetShowResult } from "../api";

import { Outlet, useLocation } from "react-router-dom";
import BannerComponent from "../Components/Banner";
import SliderComponent from "../Components/SliderComponent";
import { useRecoilValue } from "recoil";
import { bigInfoOpenState } from "../atom";
import Loading from "../Components/Loading";

const Wrapper = styled.div`
  height: 190vh;
`;

const SliderComponents = styled.div`
  &:first-child {
    background-color: white;
  }
`;

function Movies() {
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const location = useLocation();

  const MovieQueries = () => {
    const nowPlaying = useQuery<IGetShowResult>(
      ["movies", "nowPlaying"],
      () => {
        return getMovies("now_playing");
      }
    );
    const popular = useQuery<IGetShowResult>(["movies", "popular"], () => {
      return getMovies("popular");
    });

    const topRated = useQuery<IGetShowResult>(["movies", "topRated"], () => {
      return getMovies("top_rated");
    });

    const upcoming = useQuery<IGetShowResult>(["movies", "upcoming"], () => {
      return getMovies("upcoming");
    });

    return [nowPlaying, popular, topRated, upcoming];
  };

  const [
    { data: nowPlayingData, isLoading: nowPlayingLoading },
    { data: popularData, isLoading: popularLoading },
    { data: topRatedData, isLoading: topRatedLoading },
    { data: upcomingData, isLoading: upcomingLoading },
  ] = MovieQueries();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper>
      {nowPlayingLoading ||
      popularLoading ||
      topRatedLoading ||
      upcomingLoading ? (
        <Loading />
      ) : (
        <>
          <BannerComponent
            data={nowPlayingData}
            sliderType="movies"
            rowType="nowPlaying"
          />
          <SliderComponents>
            <SliderComponent
              data={nowPlayingData}
              title="Now Playing"
              sliderType="movies"
              rowType="nowPlaying"
            />
            <SliderComponent
              data={popularData}
              title="Popular"
              sliderType="movies"
              rowType="popular"
            />
            <SliderComponent
              data={topRatedData}
              title="Top-Rated"
              sliderType="movies"
              rowType="topRated"
            />
            <SliderComponent
              data={upcomingData}
              title="Coming Soon"
              sliderType="movies"
              rowType="upcoming"
            />
          </SliderComponents>

          {bigInfoOpen && (
            <Outlet
              context={
                location.pathname.includes("movies/nowPlaying")
                  ? nowPlayingData
                  : location.pathname.includes("movies/popular")
                  ? popularData
                  : location.pathname.includes("movies/topRated")
                  ? topRatedData
                  : location.pathname.includes("movies/upcoming")
                  ? upcomingData
                  : null
              }
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Movies;
