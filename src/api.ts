import axios from "axios";

const API_KEY = "3aa30d95afc8ae6f47f61c77f67449d7";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: Date;
  name: string;
  origin_country: string[];
  original_name: string;
  gender: number;
  known_for_department: string;
  profile_path: null;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface IGetShowResult {
  dates: {
    maximum: Date;
    minimum: Date;
  };
  page: number;
  results: IShow[];
  total_pages: number;
  total_results: number;
}

export interface IPropData {
  data?: IGetShowResult;
  title?: string;
  sliderType: string;
  rowType?: string;
}

export function getMovies(category: string) {
  return axios
    .get(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`)
    .then((res) => res.data);
}

export function getTvs(category: string) {
  return axios
    .get(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.data);
}

export function getSearch(type: string, keyword: string, currentPage: number) {
  return axios
    .get(
      `${BASE_PATH}/search/${type}?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${currentPage}`
    )
    .then((res) => res.data);
}
