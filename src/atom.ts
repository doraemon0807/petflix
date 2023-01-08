import { atom, selector } from "recoil";

export const movieDataState = atom({
  key: "movieData",
  default: "",
});

export const tvDataState = atom({
  key: "tvData",
  default: "",
});

export const getDataSliderType = atom({
  key: "sliderType",
  default: "",
});
