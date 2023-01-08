import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetShowResult } from "../api";

import { Outlet, useLocation } from "react-router-dom";
import BannerComponent from "../Components/Banner";
import SliderComponent from "../Components/SliderComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieDataState } from "../atom";

const Wrapper = styled.div`
  height: 200vh;
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderComponents = styled.div`
  &:first-child {
    background-color: white;
  }
`;

function Home() {
  const [rowType, setRowType] = useRecoilState(movieDataState);

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
        <Loader>Loading...</Loader>
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
          {rowType === "nowPlaying" && <Outlet context={nowPlayingData} />}
          {rowType === "popular" && <Outlet context={popularData} />}
          {rowType === "upcoming" && <Outlet context={upcomingData} />}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
