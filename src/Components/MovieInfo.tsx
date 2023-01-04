import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  Link,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMovieResult, IMovie } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  min-width: 600px;
  height: 55vh;
  min-height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigMovieContainer = styled.div`
  display: flex;
  padding: 0 15px;
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const BigPic = styled.div`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center center;
  position: relative;
  top: -80px;
  border-radius: 5px;
`;

const BigInfo = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

const BigTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 28px;
  height: 70px;
  margin-bottom: 20px;
`;

const BigOverview = styled.p`
  font-size: 16px;
`;

const BigRating = styled.div``;
const BigYear = styled.span``;
const BigGenres = styled.div``;
const BigGenre = styled.span``;
const BigWebsite = styled.span``;

function MovieInfo() {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");

  const { movieId } = useParams();

  const { data: detailData, isLoading: detailLoading } = useQuery<IMovie>(
    ["movies", "detail"],
    () => getMovies(movieId + "")
  );

  const nowPlayingData = useOutletContext<IGetMovieResult>();

  const clickedMovie =
    movieId && nowPlayingData?.results.find((movie) => movie.id === +movieId!);

  console.log(detailData);

  return (
    <AnimatePresence>
      {movieId && (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie layoutId={movieId}>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigMovieContainer>
                  <BigPic
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        clickedMovie.poster_path,
                        "w200"
                      )})`,
                    }}
                  />

                  {detailLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <BigInfo>
                        <BigTitle>
                          <span>{clickedMovie.title}</span>
                        </BigTitle>
                        <BigRating></BigRating>
                        <BigYear></BigYear>
                        <BigGenres>
                          <BigGenre></BigGenre>
                        </BigGenres>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                        <BigWebsite
                          as="a"
                          href={detailData?.homepage}
                          target="_blank"
                        >
                          Homepage
                        </BigWebsite>
                      </BigInfo>
                    </>
                  )}
                </BigMovieContainer>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieInfo;
