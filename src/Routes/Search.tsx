import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
`;

const SearchUnderbar = styled(Underbar)`
  bottom: 0;
`;

function Search() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");
  const currentPage = new URLSearchParams(search).get("page");

  const {
    data: searchMovie,
    isLoading: searchMovieLoading,
    refetch: searchMovieRefetch,
  } = useQuery<IGetShowResult>(["movie", "search"], () => {
    return getSearch("movie", keyword || "", +currentPage! || 1);
  });

  useEffect(() => {
    searchMovieRefetch();
  }, [search]);

  const {
    data: searchTv,
    isLoading: searchTvLoading,
    refetch: searchTvRefetch,
  } = useQuery<IGetShowResult>(["tv", "search"], () => {
    return getSearch("tv", keyword || "", +currentPage! || 1);
  });

  useEffect(() => {
    searchTvRefetch();
  }, [search]);

  if (
    parseInt(currentPage!) < 1 ||
    (parseInt(currentPage!) !== 1 &&
      parseInt(currentPage!) > searchMovie?.total_pages!)
  ) {
    navigate(-1);
  }

  const searchMovieMatch = pathname.includes("/search/movies");
  const searchTvMatch = pathname.includes("/search/tv");

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
                  Movies ({searchMovie?.total_results!})
                  {searchMovieMatch && (
                    <SearchUnderbar layoutId="searchUnderbar" />
                  )}
                </Link>
              </SearchTypeTab>
              <SearchTypeTab>
                <Link to={`tv?keyword=${keyword}&page=1`}>
                  TV Shows ({searchTv?.total_results!})
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
