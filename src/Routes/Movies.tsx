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
  height: 100vh;
`;

const SliderComponents = styled.div`
  &:first-child {
    background-color: white;
  }
`;

function Home() {
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const location = useLocation();

  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetShowResult>(["movies", "nowPlaying"], () => {
      return getMovies("now_playing");
    });

  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetShowResult>(["movies", "popular"], () => {
      return getMovies("popular");
    });

  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IGetShowResult>(["movies", "upcoming"], () => {
      return getMovies("upcoming");
    });

  return (
    <Wrapper>
      {nowPlayingLoading || popularLoading || upcomingLoading ? (
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

export default Home;
