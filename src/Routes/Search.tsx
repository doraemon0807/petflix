import { useQuery } from "react-query";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getSearch, IGetShowResult } from "../api";
import styled from "styled-components";
import { Underbar } from "../Components/Header";
import Loading from "../Components/Loading";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchHeader = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  margin-bottom: 20px;
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
`;

const SearchUnderbar = styled(Underbar)`
  bottom: 0;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetShowResult>(["movie", "search"], () => {
      return getSearch("movie", keyword || "");
    });

  const { data: searchTv, isLoading: searchTvLoading } =
    useQuery<IGetShowResult>(["tv", "search"], () => {
      return getSearch("tv", keyword || "");
    });

  const searchMovieMatch = location.pathname.includes("/search/movies");
  const searchTvMatch = location.pathname.includes("/search/tv");

  return (
    <>
      {searchMovieLoading || searchTvLoading ? (
        <Loading />
      ) : (
        <SearchWrapper>
          <SearchHeader>
            <SearchTitle>Search results</SearchTitle>

            <SearchTypeTabs>
              <SearchTypeTab>
                <Link to={`movies?keyword=${keyword}`}>
                  Movies (
                  {searchMovie?.results.length! < searchMovie?.total_results!
                    ? searchMovie?.results.length + "+"
                    : searchMovie?.results.length}
                  )
                  {searchMovieMatch && (
                    <SearchUnderbar layoutId="searchUnderbar" />
                  )}
                </Link>
              </SearchTypeTab>
              <SearchTypeTab>
                <Link to={`tv?keyword=${keyword}`}>
                  TV Shows (
                  {searchTv?.results.length! < searchTv?.total_results!
                    ? searchTv?.results.length + "+"
                    : searchTv?.results.length}
                  )
                  {searchTvMatch && (
                    <SearchUnderbar layoutId="searchUnderbar" />
                  )}
                </Link>
              </SearchTypeTab>
            </SearchTypeTabs>
          </SearchHeader>
          {searchMovieMatch && <Outlet context={searchMovie} />}
          {searchTvMatch && <Outlet context={searchTv} />}
        </SearchWrapper>
      )}
    </>
  );
}

export default Search;
