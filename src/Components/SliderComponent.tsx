import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useState } from "react";
import useWindowDim from "../useWindowDim";
import { IPropData } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  bigInfoOpenState,
  getDataSliderType,
  movieDataState,
  tvDataState,
} from "../atom";

const Sliders = styled.div`
  width: 100%;
  padding: 0 20px;
  position: relative;
  top: -100px;
  &:nth-child(2) {
    top: 150px;
  }
  &:nth-child(3) {
    top: 400px;
  }
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
  padding: 0 46px;
`;

const RowArrow = styled.div<{ arrowSide: string }>`
  width: 40px;
  height: 200px;
  position: absolute;
  z-index: 2;
  background-color: rgba(130, 130, 130, 0.5);
  top: 50px;
  border-radius: ${(props) =>
    props.arrowSide === "left" ? "5px 0 0 5px" : " 0 5px 5px 0"};
  ${(props) => props.arrowSide}:0;
  cursor: pointer;
  &:hover {
    background-color: rgba(190, 190, 190, 0.8);
  }
  display: flex;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  border-radius: 2px;
  cursor: pointer;
`;

export const Info = styled(motion.div)`
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

export const boxVariants = {
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

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.2,
    },
  },
};

function SliderComponent(data: IPropData) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);

  const sliderType = useRecoilValue(getDataSliderType);

  const changeIndex = (index: number) => {
    if (data.data) {
      if (leaving) return;
      if (bigInfoOpen) return;
      setLeaving(true);
      const totalShows = data.data.results.length - 1;
      const maxIndex = Math.floor(totalShows / offset) - 1;
      setIndex((prev) => {
        if (index > 0) {
          setBack(false);
          return prev === maxIndex ? 0 : prev + index;
        } else {
          setBack(true);
          return prev === 0 ? maxIndex : prev + index;
        }
      });
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const width = useWindowDim();

  const setMovieRowType = useSetRecoilState(movieDataState);
  const setTvRowType = useSetRecoilState(tvDataState);

  const onBoxClicked = (id: number, rowType: string) => {
    navigate(
      `/${sliderType === "movies" ? "movies" : "tv"}/${data.rowType}/${id}`
    );
    sliderType === "movies" ? setMovieRowType(rowType) : setTvRowType(rowType);
  };

  const origin = (index: number) => index / (offset - 1);

  const rowSliderVariants = {
    initial: (back: boolean) => ({
      x: back ? -(width + 5) : width + 5,
    }),
    animate: { x: 0 },
    exit: (back: boolean) => ({
      x: back ? width + 5 : -(width + 5),
    }),
  };

  return (
    <>
      <Sliders>
        <Slider>
          <AnimatePresence
            initial={false}
            onExitComplete={toggleLeaving}
            custom={back}
          >
            <SliderTitle>{data.title}</SliderTitle>
            <RowArrow
              key="arrowLeft"
              arrowSide="left"
              onClick={() => changeIndex(-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
              </svg>
            </RowArrow>
            <RowArrow
              key="ArrowRight"
              arrowSide="right"
              onClick={() => changeIndex(1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </RowArrow>
            <Row
              key={index}
              variants={rowSliderVariants}
              custom={back}
              initial={"initial"}
              animate={"animate"}
              exit={"exit"}
              transition={{ type: "tween", duration: 1 }}
            >
              {data.data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((show, idx) => (
                  <Box
                    layoutId={`/${data.sliderType}/${data.rowType}/${show.id}`}
                    key={`${show.id}`}
                    bgphoto={
                      show.backdrop_path
                        ? makeImagePath(show.backdrop_path, "w500")
                        : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
                    }
                    onClick={() => onBoxClicked(show.id!, data?.rowType!)}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween", duration: 0.2 }}
                    style={{ originX: origin(idx) }}
                  >
                    <Info variants={infoVariants}>
                      <h4>{show.title || show.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>
      </Sliders>
    </>
  );
}
export default SliderComponent;
