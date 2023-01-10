import { motion } from "framer-motion";
import styled from "styled-components";

const Loader = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingLetter = styled(motion.div)`
  font-size: 28px;
  margin-right: 1px;
`;

const loadingVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingLetterVariants = {
  initial: {},
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 1.5,
    },
  },
};

function Loading() {
  return (
    <>
      <Loader
        variants={loadingVariants}
        initial={"initial"}
        animate={"animate"}
      >
        <LoadingLetter variants={loadingLetterVariants}>L</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>o</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>a</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>d</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>i</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>n</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>g</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>.</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>.</LoadingLetter>
        <LoadingLetter variants={loadingLetterVariants}>.</LoadingLetter>
      </Loader>
    </>
  );
}

export default Loading;
