import { motion } from "framer-motion";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { gridBackState, gridLeavingState } from "../atom";
import { countPage } from "../utils";
import { Underbar } from "./Header";

const GridPagesWrapper = styled.div`
  margin-bottom: 50px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const GridPages = styled.div<{
  totalpage: number;
  pageOffset: number;
  currentpage: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  a {
    text-align: center;
  }
`;

const GridPage = styled(motion.div)<{
  currentpage?: number;
  totalpage?: number;
}>`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 8px 13px;
  position: relative;
  width: 50px;
  font-size: 18px;

  &:first-child,
  &:nth-of-type(2) {
    svg {
      fill: ${(props) =>
        props.currentpage === 1
          ? props.theme.black.lighter
          : props.theme.white.lighter};

      cursor: ${(props) => (props.currentpage === 1 ? "auto" : "pointer")};
    }
  }

  &:last-child,
  &:nth-of-type(3) {
    svg {
      fill: ${(props) =>
        props.currentpage === props.totalpage
          ? props.theme.black.lighter
          : props.theme.white.lighter};

      cursor: ${(props) =>
        props.currentpage === props.totalpage ? "auto" : "pointer"};
    }
  }

  &:nth-of-type(2) {
    margin-left: 0;
    padding-left: 0;
  }

  &:nth-of-type(3) {
    margin-right: 0;
    padding-right: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PagesUnderbar = styled(Underbar)`
  bottom: 0;
  width: 50%;
`;

function PagesNavigation() {
  const navigate = useNavigate();
  const data = useOutletContext<IGetShowResult>();
  const setGridBack = useSetRecoilState(gridBackState);
  const [gridLeaving, setGridLeaving] = useRecoilState(gridLeavingState);

  const { pathname, search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const currentPage = new URLSearchParams(search).get("page");
  const totalPage = data.total_pages;
  const pageOffset = 5;

  const handlePageCheck = (event: React.MouseEvent<HTMLDivElement>) => {
    parseInt(event.currentTarget.innerText) < parseInt(currentPage!)
      ? setGridBack(true)
      : setGridBack(false);
  };

  const handlePageChange = (
    back?: boolean,
    toEnd?: boolean,
    event?: React.MouseEvent<HTMLDivElement>,
    page?: number
  ) => {
    if (gridLeaving) {
      event?.preventDefault();
      return;
    }
    setGridLeaving(true);

    if (back && parseInt(currentPage!) !== 1) {
      setGridBack(true);
      navigate(
        `${pathname}?keyword=${keyword}&page=${
          toEnd ? 1 : parseInt(currentPage!) - 1
        }`
      );
    }

    if (!back && parseInt(currentPage!) !== totalPage) {
      setGridBack(false);
      navigate(
        `${pathname}?keyword=${keyword}&page=${
          toEnd ? totalPage : parseInt(currentPage!) + 1
        }`
      );
    }
  };

  const handleGridLeaving = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (gridLeaving) {
      event.preventDefault();
      return;
    }
    setGridLeaving(true);
  };

  return (
    <GridPagesWrapper>
      <GridPages
        totalpage={totalPage}
        pageOffset={pageOffset}
        currentpage={parseInt(currentPage!)}
      >
        <GridPage
          currentpage={parseInt(currentPage!)}
          totalpage={totalPage}
          onClick={(event) => handlePageChange(true, true, event)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
          </svg>
        </GridPage>
        <GridPage
          currentpage={parseInt(currentPage!)}
          totalpage={totalPage}
          onClick={(event) => handlePageChange(true, false, event)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        </GridPage>
        {Array.apply(null, Array(totalPage))
          .slice(0, 5)
          .map((_, idx) => {
            const page = countPage(
              parseInt(currentPage!),
              totalPage,
              idx,
              pageOffset
            );
            return (
              <Link
                key={idx}
                to={`${pathname}?keyword=${keyword}&page=${page}`}
                onClick={(event) => handleGridLeaving(event)}
              >
                <GridPage onClick={handlePageCheck}>
                  {page}
                  {page === parseInt(currentPage!) && (
                    <PagesUnderbar layoutId={`pagesUnderbar_${pathname}`} />
                  )}
                </GridPage>
              </Link>
            );
          })}

        <GridPage
          currentpage={parseInt(currentPage!)}
          totalpage={totalPage}
          onClick={(event) => handlePageChange(false, false, event)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </GridPage>
        <GridPage
          currentpage={parseInt(currentPage!)}
          totalpage={totalPage}
          onClick={(event) => handlePageChange(false, true, event)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
          </svg>
        </GridPage>
      </GridPages>
    </GridPagesWrapper>
  );
}

export default PagesNavigation;
