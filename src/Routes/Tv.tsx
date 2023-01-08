import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getTvs, IGetShowResult } from "../api";

import { Outlet, useLocation } from "react-router-dom";
import BannerComponent from "../Components/Banner";
import SliderComponent from "../Components/SliderComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { movieDataState, tvDataState } from "../atom";

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
  const [rowType, setRowType] = useRecoilState(tvDataState);

  const { data: latestData, isLoading: latestLoading } =
    useQuery<IGetShowResult>(["tv", "latest"], () => {
      return getTvs("latest");
    });

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
      {onAirLoading || popularLoading || latestLoading ? (
        <Loader>Loading...</Loader>
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
          {rowType === "onAir" && <Outlet context={onAirData} />}
          {rowType === "popular" && <Outlet context={popularData} />}
          {rowType === "topRated" && <Outlet context={topRatedData} />}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
