import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetShowResult } from "../api";
import { bigInfoOpenState, gridBackState, gridLeavingState } from "../atom";
import PagesNavigation from "./PagesNavigation";
import ShowBox from "./ShowBox";
import useWindowDim from "../useWindowDim";

const GridWrapper = styled.div`
  width: 100%;
  height: 110vh;
  display: flex;
  padding: 0 100px;
  margin-bottom: 100px;
  position: relative;
`;
const GridShows = styled(motion.div)<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  gap: 10px;
  position: absolute;
  left: 100px;
  right: 100px;
`;

function GridComponent() {
  const { search } = useLocation();
  const data = useOutletContext<IGetShowResult>();
  const bigInfoOpen = useRecoilValue(bigInfoOpenState);
  const setGridLeaving = useSetRecoilState(gridLeavingState);
  const gridOffset = 4;

  const [index, setIndex] = useState(0);
  const gridBack = useRecoilValue(gridBackState);

  const width = useWindowDim();

  const gridSliderVariants = {
    initial: (back: boolean) => ({
      x: back ? -width : width,
    }),
    animate: { x: 0 },
    exit: (back: boolean) => ({
      x: back ? width : -width,
    }),
  };

  useEffect(() => {
    setIndex((prev) => prev + 1);
  }, [search]);

  return (
    <>
      {data.total_pages > 0 && <PagesNavigation />}
      <GridWrapper>
        <AnimatePresence onExitComplete={() => setGridLeaving(false)}>
          <GridShows
            key={index}
            variants={gridSliderVariants}
            custom={gridBack}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            transition={{ type: "tween", duration: 1 }}
            offset={gridOffset}
          >
            {data?.results.map((show, idx) => (
              <ShowBox
                key={idx}
                show={show}
                idx={idx}
                offset={gridOffset}
                slideGrid="grid"
              />
            ))}
          </GridShows>
        </AnimatePresence>
      </GridWrapper>

      {bigInfoOpen && <Outlet context={data} />}
    </>
  );
}

export default GridComponent;
