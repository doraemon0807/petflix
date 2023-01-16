import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getSearch, IGetShowResult } from "../api";
import styled from "styled-components";
import { Underbar } from "../Components/Header";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { gridBackState } from "../atom";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchHeader = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-bottom: 10px;
`;

const SearchTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const SearchTypeTabs = styled.div`
  display: flex;
`;

const SearchTypeTab = styled.div`
  font-size: 22px;
  display: flex;
  margin-right: 20px;
  padding: 10px;
  position: relative;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SearchType = styled.div`
  display: flex;
  margin-right: 10px;
`;

const SearchCount = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 3px 5px;
  color: ${(props) => props.theme.white.darker};
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 5px;
`;

const SearchUnderbar = styled(Underbar)`
  bottom: 0;
`;

const GridWrapper = styled(motion.div)``;

function Search() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const currentPage = new URLSearchParams(search).get("page");
  const setGridBack = useSetRecoilState(gridBackState);

  const SearchQueries = () => {
    const movie = useQuery<IGetShowResult>(["movie", "search"], () => {
      return getSearch("movie", keyword || "", +currentPage! || 1);
    });
    const tv = useQuery<IGetShowResult>(["tv", "search"], () => {
      return getSearch("tv", keyword || "", +currentPage! || 1);
    });
    return [movie, tv];
  };

  const [
    {
      data: searchMovie,
      isLoading: searchMovieLoading,
      refetch: searchMovieRefetch,
    },
    { data: searchTv, isLoading: searchTvLoading, refetch: searchTvRefetch },
  ] = SearchQueries();

  useEffect(() => {
    searchMovieRefetch();
  }, [search, searchMovieRefetch]);

  useEffect(() => {
    searchTvRefetch();
  }, [search, searchTvRefetch]);

  if (
    parseInt(currentPage!) < 1 ||
    (parseInt(currentPage!) !== 1 &&
      parseInt(currentPage!) > searchMovie?.total_pages!)
  ) {
    navigate(-1);
  }

  const searchMovieMatch = pathname.includes("/search/movies");
  const searchTvMatch = pathname.includes("/search/tv");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {searchMovieLoading || searchTvLoading ? (
        <Loading />
      ) : (
        <SearchWrapper>
          <SearchHeader>
            <SearchTitle>Search results for: {keyword}</SearchTitle>

            <SearchTypeTabs>
              <SearchTypeTab>
                <Link to={`movies?keyword=${keyword}&page=1`}>
                  <SearchType>Movies</SearchType>
                  <SearchCount>{searchMovie?.total_results!}</SearchCount>
                  {searchMovieMatch && (
                    <SearchUnderbar layoutId="searchUnderbar" />
                  )}
                </Link>
              </SearchTypeTab>
              <SearchTypeTab>
                <Link to={`tv?keyword=${keyword}&page=1`}>
                  <SearchType>TV Shows</SearchType>{" "}
                  <SearchCount>{searchTv?.total_results!}</SearchCount>
                  {searchTvMatch && (
                    <SearchUnderbar layoutId="searchUnderbar" />
                  )}
                </Link>
              </SearchTypeTab>
            </SearchTypeTabs>
          </SearchHeader>

          <GridWrapper>
            {searchMovieMatch && <Outlet context={searchMovie} />}
            {searchTvMatch && <Outlet context={searchTv} />}
          </GridWrapper>
        </SearchWrapper>
      )}
    </>
  );
}

export default Search;
