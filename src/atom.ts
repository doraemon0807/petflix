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

export const searchDataState = atom({
  key: "searchData",
  default: "",
});

export const searchOpenState = atom({
  key: "searchOpen",
  default: false,
});

export const bigInfoOpenState = atom({
  key: "bigInfoOpen",
  default: false,
});
