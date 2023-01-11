import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { bigInfoOpenState } from "../atom";
import { makeImagePath } from "../utils";
import ShowBox from "./ShowBox";

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

function GridComponent() {
  const data = useOutletContext<IGetShowResult>();
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);

  return (
    <>
      <GridWrapper>
        <GridShows>
          {data?.results.map((show, idx) => (
            <ShowBox key={idx} show={show} idx={idx} slideGrid="grid" />
          ))}
        </GridShows>
      </GridWrapper>

      {bigInfoOpen && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
