import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetShowResult, IPropData, IShow } from "../api";
import { getDataSliderType, movieDataState, tvDataState } from "../atom";
import { makeImagePath } from "../utils";

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

  const onBoxClicked = (id: number, rowType: string) => {
    switch (slideGrid) {
      case "slide":
        navigate(
          `/${sliderType === "movies" ? "movies" : "tv"}/${rowType}/${id}`
        );
        sliderType === "movies"
          ? setMovieRowType(rowType)
          : setTvRowType(rowType);
        console.log(`/${sliderType}/${rowType}/${show.id}`);
        break;
      case "grid":
        navigate(`${id}${location.search}`);
        break;
    }
  };

  const origin = (index: number) => index / (offset || 0 - 1);
  console.log(`/${data?.sliderType}/${rowType}/${show.id}`);
  return (
    <Box
      layoutId={
        slideGrid === "slide"
          ? `/${data?.sliderType}/${rowType}/${show.id}`
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
      transition={{ type: "tween", duration: 0.2 }}
      style={{ originX: origin(idx) }}
    >
      <Info variants={infoVariants}>
        <h4>{show.title || show.name}</h4>
      </Info>
    </Box>
  );
}

export default ShowBox;
