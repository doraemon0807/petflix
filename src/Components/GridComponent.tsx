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
  margin-top: 50px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const GridPages = styled.div<{ totalPage: number; pageOffset: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) =>
      props.totalPage > props.pageOffset ? props.pageOffset : props.totalPage},
    1fr
  );
  gap: 20px;
  align-items: center;

  a {
    text-align: center;
  }
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
        <GridPages totalPage={totalPage} pageOffset={pageOffset}>
          {Array.apply(null, Array(totalPage))
            .slice(0, 5)
            .map((_, idx) => (
              <Link
                key={idx}
                to={`${location.pathname}?keyword=${keyword}&page=${
                  +currentPage! < 4
                    ? idx + 1
                    : +currentPage! > totalPage! - 2
                    ? totalPage! - pageOffset + idx + 1
                    : idx + +currentPage! - 2
                }`}
              >
                {+currentPage! < 4
                  ? idx + 1
                  : +currentPage! > totalPage! - 2
                  ? totalPage! - pageOffset + idx + 1
                  : idx + +currentPage! - 2}
              </Link>
            ))}
        </GridPages>
      </GridPagesWrapper>

      {bigInfoOpen && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
