import React, { useEffect, useState } from "react";

const useWindowDim = () => {
  const [windowDim, setWindowDim] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowDim(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDim;
};

export default useWindowDim;
