import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { bigInfoOpenState } from "../atom";
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

const GridPagesWrapper = styled.div`
  margin: 50px 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const GridPages = styled.div<{
  totalPage: number;
  pageOffset: number;
  currentPage: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-align: center;
  }
`;

const GridPage = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 10px;
  padding: 8px 13px;
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 5px;
`;

function GridComponent() {
  const data = useOutletContext<IGetShowResult>();
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const currentPage = new URLSearchParams(location.search).get("page");
  const totalPage = data.total_pages;
  const pageOffset = 5;

  return (
    <>
      <GridWrapper>
        <GridShows>
          {data?.results.map((show, idx) => (
            <ShowBox key={idx} show={show} idx={idx} slideGrid="grid" />
          ))}
        </GridShows>
      </GridWrapper>

      <GridPagesWrapper>
        <GridPages
          totalPage={totalPage}
          pageOffset={pageOffset}
          currentPage={parseInt(currentPage!)}
        >
          {parseInt(currentPage!) !== 1 && <GridPage>Prev</GridPage>}
          {Array.apply(null, Array(totalPage))
            .slice(0, 5)
            .map((_, idx) => (
              <Link
                key={idx}
                to={`${location.pathname}?keyword=${keyword}&page=${
                  +currentPage! < 4 || totalPage! === 4
                    ? idx + 1
                    : +currentPage! > totalPage! - 2
                    ? totalPage! - pageOffset + idx + 1
                    : idx + +currentPage! - 2
                }`}
              >
                <GridPage>
                  {+currentPage! < 4 || totalPage! <= 5
                    ? idx + 1
                    : +currentPage! > totalPage! - 2
                    ? totalPage! - pageOffset + idx + 1
                    : idx + +currentPage! - 2}
                </GridPage>
              </Link>
            ))}
          {parseInt(currentPage!) !== totalPage! && <GridPage>Next</GridPage>}
        </GridPages>
      </GridPagesWrapper>

      {bigInfoOpen && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
