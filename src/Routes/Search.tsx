import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearch, IGetShowResult } from "../api";
import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  border-radius: 2px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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

  return (
    <>
      {searchMovieLoading || searchTvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          <header>
            <span>Movies</span>
            <span>TV Shows</span>
          </header>
          <main>
            <h1>Search results</h1>
          </main>
        </div>
      )}
    </>
  );
}

export default Search;
