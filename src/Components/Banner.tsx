import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useState, useEffect } from "react";
import { IPropData } from "../api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getDataSliderType, movieDataState, tvDataState } from "../atom";

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
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

function BannerComponent(data: IPropData) {
  const [sliderType, setSliderType] = useRecoilState(getDataSliderType);

  useEffect(() => {
    setSliderType(data.sliderType);
  }, [data.sliderType]);

  const navigate = useNavigate();
  const [playAnimation, setPlayAnimation] = useState(false);

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

  const handlePlayAnimation = () => {
    if (playAnimation) return;
    setPlayAnimation(true);
    setTimeout(() => setPlayAnimation(false), 1000);
  };

  const setMovieRowType = useSetRecoilState(movieDataState);
  const setTvRowType = useSetRecoilState(tvDataState);

  const onBoxClicked = (id: number, rowType: string) => {
    navigate(
      `/${sliderType === "movies" ? "movies" : "tv"}/${data.rowType}/${id}`
    );
    sliderType === "movies" ? setMovieRowType(rowType) : setTvRowType(rowType);
  };

  console.log(data.data?.results);

  return (
    <>
      <Banner
        bgphoto={makeImagePath(data.data?.results[0].backdrop_path || "")}
      >
        <Title>
          {data.data?.results[0].title || data.data?.results[0].name}
        </Title>
        <Overview>{data.data?.results[0].overview}</Overview>
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
              onClick={() =>
                onBoxClicked(data.data?.results[0].id!, data?.rowType!)
              }
              layoutId={`/${data.sliderType}/${data.rowType}/${data.data?.results[0].id}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
              </svg>
              <span>More Info</span>
            </InfoBtn>
          </InfoBtns>
        </AnimatePresence>
      </Banner>
    </>
  );
}

export default BannerComponent;
