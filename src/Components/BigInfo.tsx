import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovies, getTvs, IGetShowResult, IShow } from "../api";
import { getDataSliderType } from "../atom";
import { makeImagePath } from "../utils";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import {
  ErrorButton,
  ErrorContainer,
  ErrorDesc,
  ErrorTitle,
} from "../Routes/ErrorPage";

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
  position: relative;
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const BigCancel = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 12px;
  right: 18px;
  stroke-width: 10px;
  fill: ${(props) => props.theme.black.lighter};
  stroke: ${(props) => props.theme.white.darker};
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.red};
    stroke: transparent;
  }
`;

const BigLeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigPic = styled.div`
  width: 140px;
  height: 200px;
  background-size: cover;
  background-position: center center;
  position: relative;
  top: -60px;
  border-radius: 5px;
`;

const BigWebsite = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-decoration: underline;
  &:hover {
    color: #3498db;
  }
`;

const BigCompany = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  top: -30px;
`;

const BigRightSection = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
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

const BigInfoTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  gap: 10px;
  justify-self: center;
  margin-bottom: 15px;
`;

const BigInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigInfoTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const BigRating = styled.div<{ rating: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  min-height: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.rating > 7 ? "#44bd32" : props.rating > 4 ? "#fa8231" : "#eb3b5a"};
  font-size: 20px;
  font-weight: 600;
`;

const BigYear = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const BigGenres = styled.div<{ genreCount: number }>`
  display: grid;
  grid-template-columns: ${(props) => (props.genreCount <= 2 ? "" : "1fr 1fr")};
  column-gap: 10px;
  padding: 0px 10px;
  height: 100%;
`;
const BigGenre = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: rgba(220, 220, 220, 0.9);
  text-align: center;
`;

const BigErrorWrapper = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const BigErrorContainer = styled(ErrorContainer)``;

const BigErrorTitle = styled(ErrorTitle)``;

const BigErrorDesc = styled(ErrorDesc)``;

const BigErrorButton = styled(ErrorButton)``;

function BigInfo() {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };

  const [error, setError] = useState(false);

  const location = useLocation();

  const { showId } = useParams();

  const sliderType = useRecoilValue(getDataSliderType);

  const { data: detailData, isLoading: detailLoading } = useQuery<IShow>(
    ["show", "detail"],
    () =>
      location.pathname.includes("movies")
        ? getMovies(showId + "")
        : getTvs(showId + "")
  );

  const data = useOutletContext<IGetShowResult>();

  const clickedShow =
    showId && data?.results.find((show) => show.id === +showId!);

  const logoPath = () => {
    if (detailData?.production_companies.length === 0) {
      return false;
    } else if (detailData?.production_companies[0].logo_path === null) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!detailData && !detailLoading) {
      setError(true);
    } else {
      setError(false);
    }
  }, [detailData, detailLoading]);

  const { data: bigErrorData } = useQuery<IShow>(["movies", "bigError"], () => {
    return getMovies("349112");
  });

  return (
    <AnimatePresence>
      {showId && (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie layoutId={location.pathname}>
            {error ? (
              <BigErrorWrapper
                bgPhoto={makeImagePath(bigErrorData?.backdrop_path || "")}
              >
                <BigErrorContainer>
                  <BigErrorTitle>Oops!</BigErrorTitle>
                  <BigErrorDesc>
                    Sorry, we can't find that page. You'll find lots to explore
                    on the home page.
                  </BigErrorDesc>

                  <BigErrorButton>
                    <Link to="/">
                      <span>Petflix Home</span>
                    </Link>
                  </BigErrorButton>
                </BigErrorContainer>
              </BigErrorWrapper>
            ) : (
              clickedShow && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${
                        clickedShow.backdrop_path
                          ? makeImagePath(clickedShow.backdrop_path, "w500")
                          : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
                      })`,
                    }}
                  />

                  <BigCancel onClick={onOverlayClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 352 512"
                    >
                      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                    </svg>
                  </BigCancel>

                  <BigMovieContainer>
                    {detailLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <BigLeftSection>
                          <BigPic
                            style={{
                              backgroundImage: `url(${
                                clickedShow.poster_path
                                  ? makeImagePath(
                                      clickedShow.poster_path,
                                      "w200"
                                    )
                                  : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
                              })`,
                            }}
                          />
                          {logoPath() ? (
                            <BigCompany
                              style={{
                                backgroundImage: `url(${makeImagePath(
                                  detailData?.production_companies[0]
                                    .logo_path!,
                                  "w200"
                                )})`,
                              }}
                            />
                          ) : null}

                          {detailData?.homepage !== "" && (
                            <BigWebsite
                              as="a"
                              href={detailData?.homepage}
                              target="_blank"
                            >
                              Homepage
                            </BigWebsite>
                          )}
                        </BigLeftSection>
                        <BigRightSection>
                          <BigTitle>
                            <span>{clickedShow.title || clickedShow.name}</span>
                          </BigTitle>
                          <BigInfoTop>
                            <BigInfoBox>
                              <BigInfoTitle>Score</BigInfoTitle>
                              <BigRating rating={clickedShow.vote_average}>
                                {clickedShow.vote_average}
                              </BigRating>
                            </BigInfoBox>
                            <BigInfoBox>
                              <BigInfoTitle>Year</BigInfoTitle>
                              <BigYear>
                                {sliderType === "movies"
                                  ? String(detailData?.release_date).slice(0, 4)
                                  : String(detailData?.first_air_date).slice(
                                      0,
                                      4
                                    )}
                              </BigYear>{" "}
                            </BigInfoBox>
                            <BigInfoBox>
                              <BigInfoTitle>Genres</BigInfoTitle>
                              <BigGenres
                                genreCount={detailData?.genres.length!}
                              >
                                {detailData?.genres.length === 0 ? (
                                  <BigGenre>None</BigGenre>
                                ) : (
                                  detailData?.genres
                                    .slice(0, 4)
                                    .map((genre) => (
                                      <BigGenre key={genre.id}>
                                        {genre.name}
                                      </BigGenre>
                                    ))
                                )}
                              </BigGenres>{" "}
                            </BigInfoBox>
                          </BigInfoTop>
                          <BigOverview>
                            {clickedShow.overview.length === 0
                              ? "No overview available"
                              : clickedShow.overview.length > 550
                              ? clickedShow.overview.substring(0, 550) + "..."
                              : clickedShow.overview}
                          </BigOverview>
                        </BigRightSection>
                      </>
                    )}
                  </BigMovieContainer>
                </>
              )
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default BigInfo;
