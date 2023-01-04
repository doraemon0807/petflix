import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";
import { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import useWindowDim from "../useWindowDim";

const Wrapper = styled.div`
  height: 200vh;
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 22px;
  width: 50%;
  margin-bottom: 30px;
`;

const InfoBtns = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40vw;
`;

const InfoBtn = styled(motion.div)`
  padding: 10px 30px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  &:first-child {
    background-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.black.darker};
    svg {
      width: 18px;
      height: 18px;
      fill: black;
    }
  }
  &:last-child {
    background-color: rgba(50, 50, 50, 0.9);
    svg {
      width: 26px;
      height: 26px;
      fill: white;
    }
  }
  span {
    display: flex;
    margin-left: 8px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Sliders = styled.div`
  width: 100%;
  padding: 0 20px;
  position: relative;
  top: -100px;
`;

const Slider = styled.div`
  position: relative;
`;

const SliderTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  top: 200px;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 20px;
  }
`;

const offset = 6;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    zIndex: 99,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.2,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.2,
    },
  },
};

function Home() {
  const navigate = useNavigate();

  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieResult>(["movies", "nowPlaying"], () =>
      getMovies("now_playing")
    );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const increaseIndex = () => {
    if (nowPlayingData) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = nowPlayingData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const width = useWindowDim();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const origin = (index: number) => index / (offset - 1);

  const handlePlayAnimation = () => {
    if (playAnimation) return;
    setPlayAnimation(true);
    setTimeout(() => setPlayAnimation(false), 1000);
  };

  const PlayBtnVariants = {
    normal: {},
    active: {
      rotateZ: 720,
      transition: {
        repeat: Infinity,
        duration: 1,
      },
    },
  };

  return (
    <Wrapper>
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
            <AnimatePresence>
              <InfoBtns>
                <InfoBtn
                  variants={PlayBtnVariants}
                  initial="normal"
                  onClick={handlePlayAnimation}
                  animate={playAnimation ? "active" : "normal"}
                  transition={{
                    duration: 1,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                  </svg>
                  <span>Play</span>
                </InfoBtn>
                <InfoBtn
                  onClick={() => onBoxClicked(nowPlayingData?.results[0].id!)}
                  layoutId={nowPlayingData?.results[0].id! + ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
                  </svg>
                  <span>More Info</span>
                </InfoBtn>
              </InfoBtns>
            </AnimatePresence>
          </Banner>
          <Sliders>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <SliderTitle>Hello</SliderTitle>
                <Row
                  key={index}
                  initial={{ x: width + 5 }}
                  animate={{ x: 0 }}
                  exit={{ x: -width - 5 }}
                  transition={{ type: "tween", duration: 1 }}
                >
                  {nowPlayingData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie, idx) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        bgphoto={
                          movie.backdrop_path
                            ? makeImagePath(movie.backdrop_path, "w500")
                            : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
                        }
                        onClick={() => onBoxClicked(movie.id)}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween", duration: 0.2 }}
                        style={{ originX: origin(idx) }}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </Sliders>

          <Outlet context={nowPlayingData} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
