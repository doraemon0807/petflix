import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvs, IGetShowResult } from "../api";

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

function TvShows() {
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const location = useLocation();

  const TvQueries = () => {
    const onAir = useQuery<IGetShowResult>(["tv", "onAir"], () => {
      return getTvs("on_the_air");
    });
    const popular = useQuery<IGetShowResult>(["tv", "popular"], () => {
      return getTvs("popular");
    });
    const topRated = useQuery<IGetShowResult>(["tv", "topRated"], () => {
      return getTvs("top_rated");
    });
    const airingToday = useQuery<IGetShowResult>(["tv", "airingToday"], () => {
      return getTvs("airing_today");
    });
    return [onAir, popular, topRated, airingToday];
  };

  const [
    { data: onAirData, isLoading: onAirLoading },
    { data: popularData, isLoading: popularLoading },
    { data: topRatedData, isLoading: topRatedLoading },
    { data: airingTodayData, isLoading: airingTodayLoading },
  ] = TvQueries();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper>
      {onAirLoading ||
      popularLoading ||
      airingTodayLoading ||
      topRatedLoading ? (
        <Loading />
      ) : (
        <>
          <BannerComponent
            data={topRatedData}
            sliderType="tv"
            rowType="topRated"
          />
          <SliderComponents>
            <SliderComponent
              data={airingTodayData}
              title="Airing Today"
              sliderType="tv"
              rowType="airingToday"
            />
            <SliderComponent
              data={topRatedData}
              title="Top Rated"
              sliderType="tv"
              rowType="topRated"
            />
            <SliderComponent
              data={onAirData}
              title="On Air"
              sliderType="tv"
              rowType="onAir"
            />
            <SliderComponent
              data={popularData}
              title="Popular"
              sliderType="tv"
              rowType="popular"
            />
          </SliderComponents>

          {bigInfoOpen && (
            <Outlet
              context={
                location.pathname.includes("tv/onAir")
                  ? onAirData
                  : location.pathname.includes("tv/popular")
                  ? popularData
                  : location.pathname.includes("tv/topRated")
                  ? topRatedData
                  : location.pathname.includes("tv/airingToday")
                  ? airingTodayData
                  : null
              }
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default TvShows;
