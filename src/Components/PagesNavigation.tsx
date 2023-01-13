import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { bigInfoOpenState } from "../atom";
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
  totalPage: number;
  pageOffset: number;
  currentPage: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  a {
    text-align: center;
  }
`;

const GridPage = styled.div<{ currentPage?: number; totalPage?: number }>`
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
        props.currentPage === 1
          ? props.theme.black.lighter
          : props.theme.white.lighter};

      cursor: ${(props) => (props.currentPage === 1 ? "auto" : "pointer")};
    }
  }

  &:last-child,
  &:nth-of-type(3) {
    svg {
      fill: ${(props) =>
        props.currentPage === props.totalPage
          ? props.theme.black.lighter
          : props.theme.white.lighter};

      cursor: ${(props) =>
        props.currentPage === props.totalPage ? "auto" : "pointer"};
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

  const { pathname, search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const currentPage = new URLSearchParams(search).get("page");
  const totalPage = data.total_pages;
  const pageOffset = 5;

  const handlePageChange = (back: boolean, toEnd: boolean) => {
    if (back && parseInt(currentPage!) !== 1) {
      navigate(
        `${pathname}?keyword=${keyword}&page=${
          toEnd ? 1 : parseInt(currentPage!) - 1
        }`
      );
    }

    if (!back && parseInt(currentPage!) !== totalPage) {
      navigate(
        `${pathname}?keyword=${keyword}&page=${
          toEnd ? totalPage : parseInt(currentPage!) + 1
        }`
      );
    }
  };
  return (
    <GridPagesWrapper>
      <GridPages
        totalPage={totalPage}
        pageOffset={pageOffset}
        currentPage={parseInt(currentPage!)}
      >
        <GridPage
          currentPage={+currentPage!}
          totalPage={totalPage}
          onClick={() => handlePageChange(true, true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
          </svg>
        </GridPage>
        <GridPage
          currentPage={+currentPage!}
          totalPage={totalPage}
          onClick={() => handlePageChange(true, false)}
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
              >
                <GridPage>
                  {page}
                  {page === parseInt(currentPage!) && (
                    <PagesUnderbar layoutId={`pagesUnderbar_${pathname}`} />
                  )}
                </GridPage>
              </Link>
            );
          })}

        <GridPage
          currentPage={+currentPage!}
          totalPage={totalPage}
          onClick={() => handlePageChange(false, false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </GridPage>
        <GridPage
          currentPage={+currentPage!}
          totalPage={totalPage}
          onClick={() => handlePageChange(false, true)}
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
