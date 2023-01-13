import { Outlet, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { bigInfoOpenState } from "../atom";
import PagesNavigation from "./PagesNavigation";
import ShowBox from "./ShowBox";

const GridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 100px;
  margin-bottom: 100px;
`;
const GridShows = styled.div<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  gap: 10px;
  width: 100%;
`;

function GridComponent() {
  const data = useOutletContext<IGetShowResult>();
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const gridOffset = 4;

  return (
    <>
      {data.total_pages > 0 && <PagesNavigation />}

      <GridWrapper>
        <GridShows offset={gridOffset}>
          {data?.results.map((show, idx) => (
            <ShowBox
              key={idx}
              show={show}
              idx={idx}
              offset={gridOffset}
              slideGrid="grid"
            />
          ))}
        </GridShows>
      </GridWrapper>

      {bigInfoOpen && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
