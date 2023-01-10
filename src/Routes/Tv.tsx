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
  height: 100%;
  background: black;
`;

const SliderComponents = styled.div`
  &:first-child {
    background-color: white;
  }
`;

function Home() {
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const location = useLocation();

  const { data: onAirData, isLoading: onAirLoading } = useQuery<IGetShowResult>(
    ["tv", "onAir"],
    () => {
      return getTvs("on_the_air");
    }
  );

  const { data: popularData, isLoading: popularLoading } =
    useQuery<IGetShowResult>(["tv", "popular"], () => {
      return getTvs("popular");
    });

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetShowResult>(["tv", "topRated"], () => {
      return getTvs("top_rated");
    });

  return (
    <Wrapper>
      {onAirLoading || popularLoading || topRatedLoading ? (
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
