import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IPropData, IShow } from "../api";
import {
  getDataSliderType,
  movieDataState,
  tvDataState,
  bigInfoOpenState,
} from "../atom";
import { rootUrl } from "../Router";
import { makeImagePath } from "../utils";

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  border-radius: 2px 2px 0 0;
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: relative;
  opacity: 0;
  top: 156px;
  width: 100%;
  border-radius: 0 0 2px 2px;
  h4 {
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -40,
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
    y: 38,
    transition: {
      delay: 0.3,
      type: "tween",
      duration: 0.2,
    },
  },
};

interface IShowBox {
  data?: IPropData;
  show: IShow;
  idx: number;
  offset?: number;
  rowType?: string;
  slideGrid: string;
}

function ShowBox({ show, idx, offset, rowType, slideGrid, data }: IShowBox) {
  const location = useLocation();

  const navigate = useNavigate();

  const sliderType = useRecoilValue(getDataSliderType);
  const setMovieRowType = useSetRecoilState(movieDataState);
  const setTvRowType = useSetRecoilState(tvDataState);
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);

  const onBoxClicked = (id: number, rowType: string) => {
    switch (slideGrid) {
      case "slide":
        navigate(
          `${rootUrl}${
            sliderType === "movies" ? "movies" : "tv"
          }/${rowType}/${id}`
        );
        sliderType === "movies"
          ? setMovieRowType(rowType)
          : setTvRowType(rowType);
        break;
      case "grid":
        navigate(`${id}${location.search}`);
        break;
    }
  };

  const origin = (index: number, slideGrid: string) => {
    switch (slideGrid) {
      case "slide":
        return index / (offset! - 1);
      case "grid":
        return 0.5;
    }
  };

  return (
    <Box
      layoutId={
        slideGrid === "slide"
          ? `${rootUrl}${data?.sliderType}/${rowType}/${show.id}`
          : `${location.pathname}/${show.id}`
      }
      key={`${show.id}`}
      bgphoto={
        show.backdrop_path
          ? makeImagePath(show.backdrop_path, "w500")
          : "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4"
      }
      onClick={() => onBoxClicked(show.id!, rowType!)}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween", duration: 0.3 }}
      style={{
        originX: bigInfoOpen ? 0.5 : origin(idx, slideGrid),
        originY: bigInfoOpen ? 0.5 : 1,
      }}
    >
      <Info
        variants={infoVariants}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <h4>{show.title || show.name}</h4>
      </Info>
    </Box>
  );
}

export default ShowBox;
