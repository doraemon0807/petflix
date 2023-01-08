import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { searchDataState } from "../atom";
import { makeImagePath } from "../utils";
import { Box, boxVariants, Info, infoVariants } from "./SliderComponent";

const GridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 100px;
`;
const GridShows = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

const GridBox = styled(Box)`
  border-radius: 5px 5px 0 0;
`;

const GridInfo = styled(Info)`
  border-radius: 0 0 5px 5px;
`;

function GridComponent() {
  const data = useOutletContext<IGetShowResult>();
  const [category, setCategory] = useRecoilState(searchDataState);

  const location = useLocation();

  const navigate = useNavigate();

  const onBoxClicked = (id: number) => {
    navigate(`${id}${location.search}`);
    setCategory(location.pathname.includes("movies") ? "movies" : "tv");
    console.log(location);
  };

  return (
    <>
      <GridWrapper>
        <GridShows>
          {data?.results.map((show, idx) => (
            <GridBox
              key={show.id}
              layoutId={`${location.pathname}/${show.id}`}
              bgphoto={
                show.backdrop_path
                  ? makeImagePath(show.backdrop_path, "w500")
                  : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
              }
              onClick={() => onBoxClicked(show.id!)}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: "tween", duration: 0.2 }}
            >
              <GridInfo variants={infoVariants}>
                <h4>{show.title || show.name}</h4>
              </GridInfo>
            </GridBox>
          ))}
        </GridShows>
      </GridWrapper>
      {category === "movies" && <Outlet context={data} />}
      {category === "tv" && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
